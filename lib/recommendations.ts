import { getSceneMatchScore, modeLabels, workplaceModes } from "@/lib/scoring";
import type { WorkplaceDnaResult, WorkplaceMode, WorkplaceScene } from "@/lib/types";

export function matchScenes(result: Pick<WorkplaceDnaResult, "scores" | "dominantMode"> | null, scenes: WorkplaceScene[], limit = 5) {
  if (!result) {
    return scenes.slice(0, limit);
  }

  return [...scenes]
    .sort((a, b) => {
      const scoreDiff = getSceneMatchScore(result.scores, b.scores) - getSceneMatchScore(result.scores, a.scores);
      if (scoreDiff !== 0) {
        return scoreDiff;
      }
      return Number(b.mode === result.dominantMode) - Number(a.mode === result.dominantMode);
    })
    .slice(0, limit);
}

export function getRecommendationReason(scene: WorkplaceScene, result: WorkplaceDnaResult) {
  const alignedModes = workplaceModes
    .filter((mode) => scene.scores[mode] >= 4 && result.scores[mode] >= Math.max(...Object.values(result.scores)) * 0.6)
    .map((mode) => modeLabels[mode]);

  const primaryReason = alignedModes.length > 0 ? `與你的 ${alignedModes.join("、")} 需求高度吻合` : `與你的 ${modeLabels[result.dominantMode]} 傾向相符`;

  return `${primaryReason}，可支援「${scene.recommendedFor.slice(0, 2).join("、")}」等使用情境。`;
}

export function getImplementationDirections(result: WorkplaceDnaResult) {
  const topModes = result.rankedModes.slice(0, 3).map((item) => item.mode);
  const directionMap: Record<WorkplaceMode, string> = {
    focus: "優先補足低干擾、可就近使用的專注席位與電話視訊空間，降低開放辦公區的中斷成本。",
    collaboration: "建立多層級協作場景，從2-5人即興討論到中大型正式會議，讓日常同步不必依賴單一會議室。",
    project: "為重要專案配置可長時間保留資訊的項目室或共創區，支援白板張貼、資料留存與團隊衝刺。",
    learning: "規劃正式培訓、閱覽與開放分享場域，讓知識傳遞從一次性課程延伸為日常學習節奏。",
    social: "強化櫃台、茶水間與Workplaza等社交節點，提升訪客體驗、員工連結與企業文化辨識度。",
    relax: "配置半開放或戶外休憩空間，讓員工能在高壓工作中短暫恢復，並自然切換回工作狀態。"
  };

  return topModes.map((mode) => directionMap[mode]);
}
