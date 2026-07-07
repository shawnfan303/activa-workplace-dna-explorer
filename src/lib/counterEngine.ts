import type { DiscoveryCounters, DiscoveryField, DiscoveryInput, DiscoveryQuestion, FollowUpLogic, SafetyResult, SolutionMapping, StakeholderPlaybook } from "@/src/types/discovery";

export const discoveryCounterBase = 5889;
export const discoveryCounterStorageKey = "aurora-discovery-assistant-local-count";
export const discoveryBriefCounterStorageKey = "aurora-discovery-assistant-brief-counters";

const solutionThemes = ["健康辦公", "高效辦公", "靈動辦公", "科技辦公", "永續辦公", "空間規劃", "家具規劃", "展廳體驗", "FaaS循環商模"];
const fieldKeys: DiscoveryField[] = ["industry", "project_scenario", "stakeholder", "space_needs", "pain_points", "solution_themes", "work_modes"];

export type BriefAction = "generated" | "copied" | "exported" | "printed";

export function readLocalDisplayCount() {
  if (typeof window === "undefined") return discoveryCounterBase;
  const stored = Number(window.localStorage.getItem(discoveryCounterStorageKey));
  return Number.isFinite(stored) ? Math.max(discoveryCounterBase, stored) : discoveryCounterBase;
}

export function incrementLocalDisplayCount() {
  if (typeof window === "undefined") return discoveryCounterBase;
  const next = readLocalDisplayCount() + 1;
  window.localStorage.setItem(discoveryCounterStorageKey, String(next));
  return next;
}

export function readBriefCounters() {
  if (typeof window === "undefined") return { generated: 0, copied: 0, exported: 0, printed: 0 };
  const parsed = JSON.parse(window.localStorage.getItem(discoveryBriefCounterStorageKey) ?? "{}") as Partial<DiscoveryCounters["brief"]>;
  return {
    generated: parsed.generated ?? 0,
    copied: parsed.copied ?? 0,
    exported: parsed.exported ?? 0,
    printed: parsed.printed ?? 0
  };
}

export function incrementBriefCounter(action: BriefAction) {
  if (typeof window === "undefined") return readBriefCounters();
  const counters = readBriefCounters();
  const next = { ...counters, [action]: counters[action] + 1 };
  window.localStorage.setItem(discoveryBriefCounterStorageKey, JSON.stringify(next));
  return next;
}

export function countSelections(input: DiscoveryInput) {
  const byField = fieldKeys.reduce(
    (acc, key) => {
      acc[key] = input[key].length;
      return acc;
    },
    {} as Record<DiscoveryField, number>
  );
  const total = Object.values(byField).reduce((sum, count) => sum + count, 0);
  const status = total <= 3 ? "條件偏少，建議補充更多需求條件。" : total <= 8 ? "可產生初步問診腳本。" : "可產生較完整拜訪摘要。";
  return { total, byField, status };
}

export function countQuestions(questions: DiscoveryQuestion[]) {
  return questions.reduce(
    (acc, question) => {
      acc.total += 1;
      acc.byType[question.question_type] = (acc.byType[question.question_type] ?? 0) + 1;
      return acc;
    },
    { total: 0, byType: {} as Record<string, number> }
  );
}

export function countStakeholders(input: DiscoveryInput, playbooks: StakeholderPlaybook[], questions: DiscoveryQuestion[]) {
  const questionsByStakeholder = input.stakeholder.reduce(
    (acc, stakeholder) => {
      acc[stakeholder] = questions.filter((question) => question.stakeholders.includes(stakeholder)).length;
      return acc;
    },
    {} as Record<string, number>
  );
  return {
    selected: input.stakeholder.length,
    coverageRate: Math.round((input.stakeholder.length / Math.max(playbooks.length, 1)) * 100),
    questionsByStakeholder
  };
}

export function countSolutions(mappings: SolutionMapping[]) {
  const counts = Object.fromEntries(solutionThemes.map((theme) => [theme, 0])) as Record<string, number>;
  mappings.forEach((mapping) => {
    mapping.mapped_solution.forEach((theme) => {
      counts[theme] = (counts[theme] ?? 0) + 1;
    });
  });
  return counts;
}

export function countFollowUps(followUps: FollowUpLogic[]) {
  const solutionSet = new Set<string>();
  followUps.forEach((item) => item.related_solution_themes.forEach((theme) => solutionSet.add(theme)));
  return {
    triggerCount: followUps.length,
    questionCount: followUps.reduce((sum, item) => sum + item.suggested_follow_ups.length, 0),
    riskCount: followUps.length,
    solutionCount: solutionSet.size
  };
}

export function countSafety(result: SafetyResult) {
  const blockedKeywords = result.issues.filter((issue) => issue.includes("敏感")).length;
  const blockedPersonal = result.issues.filter((issue) => issue.includes("Email") || issue.includes("電話") || issue.includes("地址")).length;
  const blockedSensitive = result.issues.length - blockedPersonal;
  return {
    checkedSegments: result.checkedSegments,
    passedSegments: result.safe ? result.checkedSegments : 0,
    blockedSensitive: Math.max(blockedSensitive, 0),
    blockedPersonal,
    blockedKeywords,
    safe: result.safe
  };
}

export function countCompletion(input: DiscoveryInput, counters: Omit<DiscoveryCounters, "completion" | "localDisplayCount">) {
  const selectionScore = Math.min(counters.selection.total / 9, 1) * 30;
  const stakeholderScore = Math.min(input.stakeholder.length / 3, 1) * 20;
  const painScore = Math.min(input.pain_points.length / 3, 1) * 20;
  const solutionScore = Math.min(Object.values(counters.solutions).filter(Boolean).length / 5, 1) * 15;
  const exhibitionScore = counters.selection.byField.solution_themes > 0 || counters.selection.byField.space_needs > 0 ? 10 : 0;
  const safetyScore = counters.safety.safe ? 5 : 0;
  const score = Math.round(selectionScore + stakeholderScore + painScore + solutionScore + exhibitionScore + safetyScore);
  const status = score < 40 ? "資料不足，建議補充條件。" : score < 70 ? "可產生初步問診腳本。" : score < 90 ? "可產生完整拜訪摘要。" : "問診準備完整，適合用於拜訪前準備。";
  return { score, status };
}

export function buildDiscoveryCounters(input: DiscoveryInput, questions: DiscoveryQuestion[], playbooks: StakeholderPlaybook[], mappings: SolutionMapping[], followUps: FollowUpLogic[], safety: SafetyResult, brief = readBriefCounters(), localDisplayCount = readLocalDisplayCount()): DiscoveryCounters {
  const partial = {
    selection: countSelections(input),
    questions: countQuestions(questions),
    stakeholders: countStakeholders(input, playbooks, questions),
    solutions: countSolutions(mappings),
    followUps: countFollowUps(followUps),
    brief,
    safety: countSafety(safety)
  };
  return {
    ...partial,
    completion: countCompletion(input, partial),
    localDisplayCount
  };
}
