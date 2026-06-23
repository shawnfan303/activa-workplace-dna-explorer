import type { CaseBriefModel, CaseMatchInput, MatchedCase } from "./caseTypes";

export const publicDataDisclaimer =
  "本工具僅根據公開資料進行案例匹配與初步建議，不涉及客戶個資、內部報價、成交資料、設計圖或未公開專案資訊。案例推薦結果僅供拜訪前準備與初步討論參考，正式規劃仍需由震旦家具／大震設計專人依實際需求評估。";

const stakeholderMessages: Record<string, string[]> = {
  總經理: ["強調企業形象、組織效率、人才吸引與長期營運價值。", "避免直接談單品，先說明空間策略如何支援管理目標。"],
  總務: ["強調採購流程、維護便利、耐用性、展廳試用與空間配置。", "可先聚焦規劃流程、使用情境與後續服務。"],
  人資: ["強調員工體驗、健康辦公、協作效率與返回辦公室意願。", "可用案例引導討論員工一天中的不同工作場景。"],
  ESG: ["強調循環經濟、家具延壽、回收再製、永續採購與公開資料佐證。", "不得宣稱未經驗證的減碳量或 ESG 績效，需補上材料、認證或回收資料。"],
  採購: ["強調需求釐清、規格透明、展廳比較與可維護性。", "避免提供未公開價格，先協助建立評估條件。"],
  財務: ["強調生命週期成本、彈性配置與資產管理。", "不可提供未公開價格、投資報酬率或財務效益數據。"],
  IT: ["強調智慧會議、數位服務、會議效率與科技辦公體驗。", "可將會議室與協作空間作為初步切入場景。"],
  "設計／空間規劃單位": ["強調空間機能、動線、材質、場景整合與後續深化設計。", "可用案例協助對齊風格方向與機能優先序。"]
};

function listOrDash(items: string[]) {
  return items.length > 0 ? items.join("、") : "尚未選擇";
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function generateStakeholderTalkingPoints(stakeholder: string) {
  return stakeholderMessages[stakeholder] ?? ["建議先釐清決策目標、使用者需求與正式規劃條件。"];
}

export function generateCaseBriefModel(userInput: CaseMatchInput, selectedCases: MatchedCase[]): CaseBriefModel {
  const strategies = unique(selectedCases.flatMap((item) => item.space_types)).slice(0, 3);
  const themes = unique(selectedCases.flatMap((item) => item.solution_themes));
  const stakeholderPoints = generateStakeholderTalkingPoints(userInput.stakeholder);

  const opening =
    `根據目前公開案例匹配結果，建議本次拜訪先以「${listOrDash(userInput.space_types)}」與「${listOrDash(userInput.pain_points)}」作為需求確認主軸，` +
    `並搭配${selectedCases.map((item) => `「${item.title}」`).join("、")}等公開案例，協助客戶快速理解可參考的空間策略。` +
    `本工具僅作為初步討論輔助，後續仍需由震旦家具／大震設計專人依實際條件評估。`;

  return {
    needAssumptions: [
      { label: "產業", value: listOrDash(userInput.industry) },
      { label: "空間需求", value: listOrDash(userInput.space_types) },
      { label: "主要痛點", value: listOrDash(userInput.pain_points) },
      { label: "解決方案主題", value: listOrDash(userInput.solution_themes) },
      { label: "主要溝通對象", value: userInput.stakeholder || "尚未選擇" }
    ],
    selectedCases,
    strategyCards:
      strategies.length > 0
        ? strategies.map((item, index) => ({
            title: `策略 ${index + 1}｜${item}`,
            description: `以「${item}」作為初步討論場景，確認使用者需求、動線與配置優先序。`
          }))
        : [{ title: "尚未選擇案例", description: "請先從推薦結果中加入 1–3 個案例，以產生可對應的空間策略。" }],
    solutionThemes: themes,
    showroomFocus: [
      "依客戶最關注的空間需求，優先安排對應場景展示。",
      `針對「${listOrDash(userInput.pain_points)}」逐一確認現況限制與期待成果。`,
      `與${userInput.stakeholder || "主要窗口"}溝通時，建議${stakeholderPoints.join(" ")}`
    ],
    openingTalk: opening,
    stakeholderPoints,
    nextActions: ["邀請客戶參觀展示中心。", "進一步釐清空間需求、使用人數、會議型態與決策流程。", "由專人依實際條件進行規劃評估。"],
    disclaimer: publicDataDisclaimer
  };
}

export function generateCaseBrief(userInput: CaseMatchInput, selectedCases: MatchedCase[]) {
  const model = generateCaseBriefModel(userInput, selectedCases);
  const caseBlocks = selectedCases
    .map(
      (item, index) => `### 案例 ${index + 1}：${item.title}
- 匹配分數：${item.score}
- 推薦原因：${item.recommendationReason}
- 可借鏡重點：${item.proposal_angle}
- 適合拜訪情境：${item.recommended_for.join("、")}
- 公開來源：${item.source_url}`
    )
    .join("\n\n");

  return `# 案例匹配摘要

## 一、客戶需求假設
根據本次選擇條件，客戶可能正在關注：
- 產業：${listOrDash(userInput.industry)}
- 空間需求：${listOrDash(userInput.space_types)}
- 主要痛點：${listOrDash(userInput.pain_points)}
- 解決方案主題：${listOrDash(userInput.solution_themes)}
- 主要溝通對象：${userInput.stakeholder || "尚未選擇"}

## 二、推薦公開案例

${caseBlocks || "尚未選擇案例。"}

## 三、可對應的空間策略
${model.strategyCards.map((item) => `- ${item.title}：${item.description}`).join("\n")}
- 對應解決方案主題：${listOrDash(model.solutionThemes)}

## 四、建議營業開場話術
${model.openingTalk}

## 五、建議展廳參觀重點
${model.showroomFocus.map((item) => `- ${item}`).join("\n")}

## 六、後續行動建議
${model.nextActions.map((item) => `- ${item}`).join("\n")}

## 七、公開資料聲明
${model.disclaimer}`;
}
