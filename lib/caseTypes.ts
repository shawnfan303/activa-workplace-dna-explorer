export type CaseItem = {
  id: string;
  data_status: string;
  title: string;
  client_name_public: string;
  industry: string[];
  space_types: string[];
  solution_themes: string[];
  work_modes: string[];
  pain_points: string[];
  summary: string;
  recommended_for: string[];
  proposal_angle: string;
  sales_talking_points: string[];
  related_products_or_categories: string[];
  source_url: string;
  source_type: "official_website";
  last_reviewed: string;
};

export type CaseMatchInput = {
  industry: string[];
  project_scenario: string[];
  space_types: string[];
  pain_points: string[];
  solution_themes: string[];
  work_modes: string[];
  stakeholder: string;
};

export type MatchedCase = CaseItem & {
  score: number;
  matchedReasons: string[];
  recommendationReason: string;
  scoreBreakdown: Record<string, number>;
};

export type CaseBriefModel = {
  needAssumptions: Array<{
    label: string;
    value: string;
  }>;
  selectedCases: MatchedCase[];
  strategyCards: Array<{
    title: string;
    description: string;
  }>;
  solutionThemes: string[];
  showroomFocus: string[];
  openingTalk: string;
  stakeholderPoints: string[];
  nextActions: string[];
  disclaimer: string;
};
