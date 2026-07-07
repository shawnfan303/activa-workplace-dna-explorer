export type ReviewStatus = "approved_public" | "sample_pending_review" | "pending_review" | "blocked";

export type PublicSourceMeta = {
  source_url: string;
  source_domain: "aurora_furniture" | "aid_aurora";
  source_type: "official_website";
  last_crawled: string;
  review_status: ReviewStatus;
};

export type ProductItem = PublicSourceMeta & {
  id: string;
  name: string;
  type: "product_category";
  parent_category: string;
  category: string;
  sub_category: string;
  description: string;
  suitable_spaces: string[];
  suitable_work_modes: string[];
  suitable_users: string[];
  solution_themes: string[];
  style_tags: string[];
  pain_points: string[];
  industries?: string[];
  project_scenarios?: string[];
  recommendation_logic: string;
};

export type SceneItem = PublicSourceMeta & {
  id: string;
  name: string;
  scene_type: "office_scene";
  description: string;
  suitable_products: string[];
  suitable_work_modes: string[];
  solution_themes: string[];
  style_tags: string[];
  pain_points: string[];
  suitable_users?: string[];
  industries?: string[];
  project_scenarios?: string[];
  design_guidance: string;
};

export type SolutionItem = PublicSourceMeta & {
  id: string;
  name: string;
  description: string;
  related_spaces: string[];
  related_products: string[];
  related_work_modes: string[];
  pain_points: string[];
  talking_points: string[];
};

export type DesignServiceItem = PublicSourceMeta & {
  id: string;
  name: string;
  description: string;
  suitable_scenarios: string[];
  related_spaces: string[];
  related_solution_themes: string[];
  recommendation_logic: string;
  related_products?: string[];
};

export type RecommenderInput = {
  space_type: string[];
  user_role: string[];
  work_mode: string[];
  style_preference: string[];
  pain_points: string[];
  solution_theme: string[];
  industry: string[];
  project_scenario: string[];
};

export type ProductRecommendation = ProductItem & {
  match_score: number;
  matched_tags: string[];
  recommendation_reason: string;
  suitable_scene: string;
};

export type SceneRecommendation = SceneItem & {
  match_score: number;
  matched_tags: string[];
  scene_strategy: string;
  recommended_products: string[];
};

export type DesignServiceRecommendation = DesignServiceItem & {
  match_score: number;
  matched_tags: string[];
  recommendation_reason: string;
};

