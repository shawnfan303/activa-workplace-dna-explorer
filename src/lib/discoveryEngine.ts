import { buildDiscoveryCounters } from "@/src/lib/counterEngine";
import { validatePublicSafeText } from "@/src/lib/sensitiveDataGuard";
import type { DiscoveryCounters, DiscoveryInput, DiscoveryQuestion, FollowUpLogic, SolutionMapping, StakeholderPlaybook } from "@/src/types/discovery";

const priorityFields: Array<keyof DiscoveryInput> = ["stakeholder", "pain_points", "project_scenario", "solution_themes", "space_needs", "work_modes", "industry"];
const typeOrder = ["strategic", "spatial", "user_experience", "operation", "sustainability", "technology", "exhibition", "budget_context", "lifecycle", "brand"];

function intersectionCount(a: string[], b: string[]) {
  return a.filter((item) => b.includes(item)).length;
}

function scoreQuestion(input: DiscoveryInput, question: DiscoveryQuestion) {
  const source = {
    industry: question.industries,
    project_scenario: question.project_scenarios,
    stakeholder: question.stakeholders,
    space_needs: question.space_needs,
    pain_points: question.pain_points,
    solution_themes: question.solution_themes,
    work_modes: question.work_modes
  };
  return priorityFields.reduce((score, field, index) => score + intersectionCount(input[field], source[field]) * (8 - index), 0);
}

export function generateDiscoveryQuestions(input: DiscoveryInput, questionBank: DiscoveryQuestion[]) {
  const selected = questionBank
    .filter((question) => question.review_status !== "blocked")
    .map((question) => ({ question, score: scoreQuestion(input, question) }))
    .sort((a, b) => b.score - a.score || typeOrder.indexOf(a.question.question_type) - typeOrder.indexOf(b.question.question_type));

  const balanced: DiscoveryQuestion[] = [];
  typeOrder.forEach((type) => {
    const match = selected.find((item) => item.question.question_type === type && item.score > 0 && !balanced.includes(item.question));
    if (match) balanced.push(match.question);
  });

  selected.forEach((item) => {
    if (balanced.length < 12 && item.score > 0 && !balanced.includes(item.question)) balanced.push(item.question);
  });

  if (balanced.length < 8) {
    selected.forEach((item) => {
      if (balanced.length < 8 && !balanced.includes(item.question)) balanced.push(item.question);
    });
  }

  return balanced.slice(0, 12);
}

export function generateStakeholderQuestions(input: DiscoveryInput, playbooks: StakeholderPlaybook[]) {
  return input.stakeholder
    .map((stakeholder) => playbooks.find((playbook) => playbook.stakeholder === stakeholder))
    .filter((playbook): playbook is StakeholderPlaybook => Boolean(playbook))
    .map((playbook) => ({
      stakeholder: playbook.stakeholder,
      opening_angle: playbook.opening_angle,
      questions: playbook.recommended_questions.slice(0, 6),
      tone: playbook.tone
    }));
}

export function generateFollowUpSuggestions(input: DiscoveryInput, followUpLogic: FollowUpLogic[]) {
  const selectedTerms = [...input.pain_points, ...input.project_scenario, ...input.solution_themes];
  const scored = followUpLogic
    .map((logic) => ({
      logic,
      score:
        selectedTerms.filter((term) => logic.trigger_need.includes(term) || logic.risk.includes(term)).length * 2 +
        intersectionCount(input.solution_themes, logic.related_solution_themes)
    }))
    .sort((a, b) => b.score - a.score);

  const matched = scored.filter((item) => item.score > 0).map((item) => item.logic);
  return (matched.length ? matched : followUpLogic).slice(0, 5);
}

export function mapSolutions(input: DiscoveryInput, solutionMapping: SolutionMapping[]) {
  const mappings = solutionMapping.filter((mapping) => input.pain_points.includes(mapping.pain_point));
  return mappings.length ? mappings : solutionMapping.filter((mapping) => intersectionCount(input.solution_themes, mapping.mapped_solution) > 0).slice(0, 5);
}

export function generateExhibitionAdvice(input: DiscoveryInput, mappedSolutions: SolutionMapping[], baseAdvice: Array<{ condition_tags: string[]; advice: string }>) {
  const selectedTerms = [...Object.values(input).flat(), ...mappedSolutions.flatMap((mapping) => mapping.mapped_solution)];
  const matched = baseAdvice
    .map((item) => ({ item, score: intersectionCount(selectedTerms, item.condition_tags) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.item.advice);

  const fallback = mappedSolutions.flatMap((mapping) => mapping.talking_points.map((point) => `建議體驗與討論：${point}`));
  return [...matched, ...fallback].slice(0, 5);
}

export function generateDiscoveryAxis(input: DiscoveryInput) {
  const selectedPain = input.pain_points.slice(0, 3).join("、") || "企業辦公需求";
  const selectedSolutions = input.solution_themes.slice(0, 3).join("、") || "健康、高效、科技、永續與空間策略";
  return `根據本次條件，本案建議不要直接從家具品項或座位數切入，而應先釐清企業希望透過辦公場域調整達成的管理目標。可優先圍繞「${selectedPain}」建立訪談主軸，再連結至「${selectedSolutions}」等解決方案方向。拜訪時建議先確認不同角色的決策關注、實際使用情境與展廳體驗需求，後續再由震旦家具／大震設計專人依現場條件進一步評估。`;
}

export function generateOpeningScript(input: DiscoveryInput) {
  const scenarios = input.project_scenario.slice(0, 2).join("、") || "這次辦公空間調整";
  const stakeholders = input.stakeholder.slice(0, 2).join("、") || "相關決策與使用單位";
  return `今天想先協助貴方把「${scenarios}」背後的使用情境與管理目標整理清楚，而不是一開始就進入家具品項討論。我們會從 ${stakeholders} 的關注角度，了解員工體驗、協作效率、空間機能與後續展廳體驗重點，作為拜訪前準備與初步討論方向。正式規劃仍建議由震旦家具／大震設計專人依實際條件進一步評估。`;
}

export function buildDiscoveryMarkdown(input: DiscoveryInput, questions: DiscoveryQuestion[], stakeholderQuestions: ReturnType<typeof generateStakeholderQuestions>, followUps: FollowUpLogic[], mappedSolutions: SolutionMapping[], exhibitionAdvice: string[], counters: DiscoveryCounters) {
  const solutionGroups = Object.entries(counters.solutions).filter(([, count]) => count > 0);

  return `# AURORA Discovery Assistant｜企業辦公需求探索摘要

## 一、需求條件摘要

- 產業類型：${input.industry.join("、") || "未選擇"}
- 專案情境：${input.project_scenario.join("、") || "未選擇"}
- 主要對話窗口：${input.stakeholder.join("、") || "未選擇"}
- 空間需求：${input.space_needs.join("、") || "未選擇"}
- 主要痛點：${input.pain_points.join("、") || "未選擇"}
- 解決方案主題：${input.solution_themes.join("、") || "未選擇"}
- 工作模式：${input.work_modes.join("、") || "未選擇"}

## 二、問診準備完成度

- 條件選擇數：${counters.selection.total}
- 產生問診題數：${counters.questions.total}
- 涵蓋角色數：${counters.stakeholders.selected}
- 對應解方數：${solutionGroups.length}
- 追問建議數：${counters.followUps.questionCount}
- 安全檢查狀態：${counters.safety.safe ? "通過" : "偵測到疑似敏感內容，已阻擋輸出"}
- 完成度：${counters.completion.score}%

## 三、建議問診主軸

${generateDiscoveryAxis(input)}

## 四、核心問診問題

${questions.map((question, index) => `${index + 1}. 問題：${question.question}
   - 目的：${question.purpose}
   - 適合詢問對象：${question.stakeholders.join("、")}`).join("\n\n")}

## 五、角色化問題

${stakeholderQuestions.map((group) => `### ${group.stakeholder}
${group.questions.map((question) => `- ${question}`).join("\n")}`).join("\n\n")}

## 六、追問邏輯

${followUps.map((item) => `- 客戶可能表面需求：${item.trigger_need}
  - 可能風險：${item.risk}
  - 建議追問：${item.suggested_follow_ups.join("；")}
  - 可延伸解方：${item.related_solution_themes.join("、")}`).join("\n\n")}

## 七、初步解方對應

${solutionGroups.map(([theme]) => `- ${theme}：${mappedSolutions.filter((mapping) => mapping.mapped_solution.includes(theme)).map((mapping) => mapping.pain_point).join("、")}`).join("\n")}

## 八、建議展廳參觀重點

${exhibitionAdvice.map((item) => `- ${item}`).join("\n")}

## 九、建議營業開場話術

${generateOpeningScript(input)}

## 十、下一步建議

- 邀請客戶參觀展示中心
- 進一步釐清實際空間需求
- 由震旦家具／大震設計專人依現場條件進行規劃評估
- 視需求進一步討論家具配置、空間設計、施工監造或專案管理服務

## 十一、公開資料聲明

本摘要僅根據震旦家具與大震設計官網公開資料，以及使用者所選擇的非識別化條件產生。不涉及客戶個資、內部報價、成交資訊、設計圖、合約內容、CRM資料或未公開專案資料。內容僅供拜訪前準備與初步討論參考，正式規劃仍需由震旦家具／大震設計專人依實際需求評估。`;
}

export function generateDiscoveryResult(input: DiscoveryInput, questionBank: DiscoveryQuestion[], playbooks: StakeholderPlaybook[], followUpLogic: FollowUpLogic[], solutionMapping: SolutionMapping[], exhibitionAdviceData: Array<{ condition_tags: string[]; advice: string }>, briefCounters?: DiscoveryCounters["brief"], localDisplayCount?: number) {
  const safetyText = JSON.stringify(input);
  const safety = validatePublicSafeText(safetyText);
  const safeInput = safety.safe ? input : ({ industry: [], project_scenario: [], stakeholder: [], space_needs: [], pain_points: [], solution_themes: [], work_modes: [] } satisfies DiscoveryInput);
  const questions = safety.safe ? generateDiscoveryQuestions(safeInput, questionBank) : [];
  const stakeholderQuestions = safety.safe ? generateStakeholderQuestions(safeInput, playbooks) : [];
  const followUps = safety.safe ? generateFollowUpSuggestions(safeInput, followUpLogic) : [];
  const mappedSolutions = safety.safe ? mapSolutions(safeInput, solutionMapping) : [];
  const exhibitionAdvice = safety.safe ? generateExhibitionAdvice(safeInput, mappedSolutions, exhibitionAdviceData) : [];
  const counters = buildDiscoveryCounters(safeInput, questions, playbooks, mappedSolutions, followUps, safety, briefCounters, localDisplayCount);
  const briefMarkdown = safety.safe ? buildDiscoveryMarkdown(safeInput, questions, stakeholderQuestions, followUps, mappedSolutions, exhibitionAdvice, counters) : "";

  return { questions, stakeholderQuestions, followUps, mappedSolutions, exhibitionAdvice, counters, briefMarkdown };
}
