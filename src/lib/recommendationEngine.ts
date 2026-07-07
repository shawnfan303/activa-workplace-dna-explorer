import type {
  DesignServiceItem,
  DesignServiceRecommendation,
  ProductItem,
  ProductRecommendation,
  RecommenderInput,
  SceneItem,
  SceneRecommendation
} from "@/src/types/recommender";
import { isDisplayableReviewStatus } from "./sourceValidator";

const weights = {
  space_type: 20,
  user_role: 10,
  work_mode: 15,
  style_preference: 15,
  pain_points: 15,
  solution_theme: 15,
  industry: 5,
  project_scenario: 5
} satisfies Record<keyof RecommenderInput, number>;

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function intersection(a: string[], b: string[]) {
  return a.filter((item) => b.includes(item));
}

export function calculateDimensionScore(userSelections: string[], itemTags: string[], maxScore: number) {
  if (userSelections.length === 0) return null;
  if (itemTags.length === 0) return { score: 0, matches: [] };
  const matches = intersection(userSelections, itemTags);
  return {
    score: (matches.length / userSelections.length) * maxScore,
    matches
  };
}

function scoreDimensions(input: RecommenderInput, dimensions: Record<keyof RecommenderInput, string[]>) {
  let score = 0;
  let activeWeight = 0;
  const matchedTags: string[] = [];

  (Object.keys(weights) as Array<keyof RecommenderInput>).forEach((key) => {
    const result = calculateDimensionScore(input[key], dimensions[key], weights[key]);
    if (!result) return;
    activeWeight += weights[key];
    score += result.score;
    matchedTags.push(...result.matches);
  });

  const normalized = activeWeight === 0 ? 0 : Math.round((score / activeWeight) * 100);
  return { score: normalized, matchedTags: unique(matchedTags) };
}

function lowScoreReason(score: number) {
  return score < 40 ? "目前公開資料匹配度較低，建議改由震旦家具／大震設計專人進一步評估。" : "";
}

export function generateRecommendationReason(userInput: RecommenderInput, matchedItem: { name: string; recommendation_logic?: string; match_score?: number; matched_tags?: string[] }) {
  const tags = matchedItem.matched_tags?.slice(0, 5).join("、") || "目前條件";
  const base = `根據您選擇的「${tags}」等條件，${matchedItem.name}可作為初步討論方向。${matchedItem.recommendation_logic ?? ""}`;
  return `${base}${lowScoreReason(matchedItem.match_score ?? 100)}`.trim();
}

export function recommendProducts(userInput: RecommenderInput, products: ProductItem[]): ProductRecommendation[] {
  return products
    .filter((item) => isDisplayableReviewStatus(item.review_status))
    .map((item) => {
      const result = scoreDimensions(userInput, {
        space_type: item.suitable_spaces,
        user_role: item.suitable_users,
        work_mode: item.suitable_work_modes,
        style_preference: item.style_tags,
        pain_points: item.pain_points,
        solution_theme: item.solution_themes,
        industry: item.industries ?? [],
        project_scenario: item.project_scenarios ?? []
      });
      const recommendation = { ...item, match_score: result.score, matched_tags: result.matchedTags, suitable_scene: item.suitable_spaces[0] ?? "可進一步評估" };
      return { ...recommendation, recommendation_reason: generateRecommendationReason(userInput, recommendation) };
    })
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 5);
}

export function recommendScenes(userInput: RecommenderInput, scenes: SceneItem[]): SceneRecommendation[] {
  return scenes
    .filter((item) => isDisplayableReviewStatus(item.review_status))
    .map((item) => {
      const result = scoreDimensions(userInput, {
        space_type: [item.name],
        user_role: item.suitable_users ?? [],
        work_mode: item.suitable_work_modes,
        style_preference: item.style_tags,
        pain_points: item.pain_points,
        solution_theme: item.solution_themes,
        industry: item.industries ?? [],
        project_scenario: item.project_scenarios ?? []
      });
      return {
        ...item,
        match_score: result.score,
        matched_tags: result.matchedTags,
        scene_strategy: `${item.design_guidance}${lowScoreReason(result.score)}`,
        recommended_products: item.suitable_products
      };
    })
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 3);
}

export function recommendDesignServices(userInput: RecommenderInput, services: DesignServiceItem[]): DesignServiceRecommendation[] {
  return services
    .filter((item) => isDisplayableReviewStatus(item.review_status))
    .map((item) => {
      const result = scoreDimensions(userInput, {
        space_type: item.related_spaces,
        user_role: [],
        work_mode: [],
        style_preference: [],
        pain_points: [],
        solution_theme: item.related_solution_themes,
        industry: [],
        project_scenario: item.suitable_scenarios
      });
      const recommendation = { ...item, match_score: result.score, matched_tags: result.matchedTags };
      return { ...recommendation, recommendation_reason: generateRecommendationReason(userInput, recommendation) };
    })
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 4);
}

export function generateProductSceneBrief(
  userInput: RecommenderInput,
  recommendedProducts: ProductRecommendation[],
  recommendedScenes: SceneRecommendation[],
  recommendedServices: DesignServiceRecommendation[]
) {
  return { userInput, recommendedProducts, recommendedScenes, recommendedServices };
}

export function generateExhibitionAdvice(input: RecommenderInput, products: ProductRecommendation[], scenes: SceneRecommendation[]) {
  const topProducts = products.slice(0, 3).map((item) => item.name).join("、") || "相關產品分類";
  const topScenes = scenes.slice(0, 2).map((item) => item.name).join("、") || "對應辦公場景";
  return [
    `優先體驗${topProducts}，確認使用者在實際工作姿勢、協作與收納上的需求。`,
    `以${topScenes}作為導覽主軸，討論空間配置如何支援${input.work_mode.join("、") || "不同工作模式"}。`,
    `針對「${input.pain_points.join("、") || "目前痛點"}」逐一確認現場限制，避免直接跳到單品選型。`,
    "若涉及整體改造，建議同步請大震設計專人協助評估室內設計、家具規劃與專案管理需求。"
  ];
}

