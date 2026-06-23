import type { CaseItem, CaseMatchInput, MatchedCase } from "./caseTypes";

const weights = {
  industry: 25,
  space_types: 20,
  pain_points: 20,
  solution_themes: 15,
  work_modes: 10,
  recommended_for: 5,
  source_url: 5
};

export function calculateDimensionScore(userSelections: string[], caseTags: string[], maxScore: number) {
  if (userSelections.length === 0) {
    return 0;
  }

  const matchedCount = userSelections.filter((selection) => caseTags.includes(selection)).length;
  return Math.round((matchedCount / userSelections.length) * maxScore);
}

function matchedLabels(userSelections: string[], caseTags: string[]) {
  return userSelections.filter((selection) => caseTags.includes(selection));
}

export function generateRecommendationReason(userInput: CaseMatchInput, caseItem: CaseItem) {
  const matches = [
    ...matchedLabels(userInput.industry, caseItem.industry),
    ...matchedLabels(userInput.space_types, caseItem.space_types),
    ...matchedLabels(userInput.pain_points, caseItem.pain_points),
    ...matchedLabels(userInput.solution_themes, caseItem.solution_themes)
  ];

  const uniqueMatches = Array.from(new Set(matches)).slice(0, 6);

  if (uniqueMatches.length === 0) {
    return "此案例可作為公開案例資料庫中的延伸參考，但與目前選擇條件的直接匹配有限，建議由專人進一步判斷。";
  }

  return `此案例與您選擇的「${uniqueMatches.join("、")}」條件相關，適合用於初步討論${caseItem.proposal_angle.replace("適合用於", "")}`;
}

export function matchCases(userInput: CaseMatchInput, cases: CaseItem[], limit = 5): MatchedCase[] {
  return cases
    .map((caseItem) => {
      const scoreBreakdown = {
        industry: calculateDimensionScore(userInput.industry, caseItem.industry, weights.industry),
        space_types: calculateDimensionScore(userInput.space_types, caseItem.space_types, weights.space_types),
        pain_points: calculateDimensionScore(userInput.pain_points, caseItem.pain_points, weights.pain_points),
        solution_themes: calculateDimensionScore(userInput.solution_themes, caseItem.solution_themes, weights.solution_themes),
        work_modes: calculateDimensionScore(userInput.work_modes, caseItem.work_modes, weights.work_modes),
        recommended_for: calculateDimensionScore(userInput.project_scenario, caseItem.recommended_for, weights.recommended_for),
        source_url: caseItem.source_url ? weights.source_url : 0
      };

      const matchedReasons = [
        ...matchedLabels(userInput.industry, caseItem.industry).map((item) => `產業符合：${item}`),
        ...matchedLabels(userInput.space_types, caseItem.space_types).map((item) => `空間需求符合：${item}`),
        ...matchedLabels(userInput.pain_points, caseItem.pain_points).map((item) => `痛點符合：${item}`),
        ...matchedLabels(userInput.solution_themes, caseItem.solution_themes).map((item) => `解決方案主題符合：${item}`),
        ...matchedLabels(userInput.work_modes, caseItem.work_modes).map((item) => `工作模式符合：${item}`),
        ...matchedLabels(userInput.project_scenario, caseItem.recommended_for).map((item) => `拜訪情境符合：${item}`)
      ];

      const score = Object.values(scoreBreakdown).reduce((sum, current) => sum + current, 0);

      return {
        ...caseItem,
        score,
        matchedReasons,
        recommendationReason: generateRecommendationReason(userInput, caseItem),
        scoreBreakdown
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
