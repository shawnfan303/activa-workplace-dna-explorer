import type { DesignServiceRecommendation, ProductRecommendation, RecommenderInput, SceneRecommendation } from "@/src/types/recommender";
import { generateExhibitionAdvice } from "./recommendationEngine";

export const productScenePublicDataDisclaimer =
  "本摘要僅根據震旦家具與大震設計官網公開資料進行初步推薦，不涉及客戶個資、內部報價、成交資訊、設計圖、合約內容或未公開專案資料。推薦結果僅供拜訪前準備、展廳參觀前討論與初步方向參考，正式規劃仍需由震旦家具／大震設計專人依實際需求評估。";

function list(items: string[]) {
  return items.length > 0 ? items.join("、") : "尚未選擇";
}

export function generateSalesOpening(input: RecommenderInput, products: ProductRecommendation[], scenes: SceneRecommendation[]) {
  const productNames = products.slice(0, 2).map((item) => item.name).join("、") || "相關產品分類";
  const sceneNames = scenes.slice(0, 2).map((item) => item.name).join("、") || "辦公場景";
  return `依照目前條件，建議本次討論先從${list(input.space_type)}與${list(input.pain_points)}切入，並以${sceneNames}作為空間情境主軸。產品方向可先參考${productNames}，用於展廳體驗與需求釐清。後續仍建議由震旦家具／大震設計專人依實際現場條件，進一步評估家具配置、空間設計與導入順序。`;
}

export function generateRecommendationBrief(
  input: RecommenderInput,
  products: ProductRecommendation[],
  scenes: SceneRecommendation[],
  services: DesignServiceRecommendation[]
) {
  const exhibitionAdvice = generateExhibitionAdvice(input, products, scenes);
  return `# 產品與場景推薦摘要

## 一、需求條件摘要

根據本次選擇條件，使用者可能正在關注以下辦公空間需求：

- 空間類型：${list(input.space_type)}
- 使用者角色：${list(input.user_role)}
- 工作模式：${list(input.work_mode)}
- 風格偏好：${list(input.style_preference)}
- 主要痛點：${list(input.pain_points)}
- 解決方案主題：${list(input.solution_theme)}
- 產業：${list(input.industry)}
- 專案情境：${list(input.project_scenario)}

## 二、推薦產品分類

${products.map((item, index) => `### 推薦 ${index + 1}：${item.name}
- 產品分類：${item.name}
- 匹配分數：${item.match_score}
- 適合空間：${list(item.suitable_spaces)}
- 適合工作模式：${list(item.suitable_work_modes)}
- 推薦原因：${item.recommendation_reason}
- 公開來源：${item.source_url}`).join("\n\n")}

## 三、推薦辦公場景

${scenes.map((item, index) => `### 場景 ${index + 1}：${item.name}
- 場景名稱：${item.name}
- 空間策略：${item.scene_strategy}
- 建議產品分類：${list(item.recommended_products)}
- 可解決痛點：${list(item.pain_points)}
- 公開來源：${item.source_url}`).join("\n\n")}

## 四、大震設計服務建議

${services.map((item) => `- 建議服務方向：${item.name}
- 適合情境：${list(item.suitable_scenarios)}
- 推薦原因：${item.recommendation_reason}
- 可與震旦家具搭配的方向：${list(item.related_products ?? [])}`).join("\n\n")}

## 五、建議展廳體驗重點

${exhibitionAdvice.map((item) => `- ${item}`).join("\n")}

## 六、建議營業開場話術

${generateSalesOpening(input, products, scenes)}

## 七、後續行動建議

- 邀請客戶參觀展示中心
- 進一步釐清實際空間需求
- 由震旦家具／大震設計專人依現場條件進行規劃評估
- 可視需求進一步討論家具配置、空間設計、施工監造或專案管理服務

## 八、公開資料聲明

${productScenePublicDataDisclaimer}`;
}

