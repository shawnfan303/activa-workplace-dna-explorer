export type DiscoveryField =
  | "industry"
  | "project_scenario"
  | "stakeholder"
  | "space_needs"
  | "pain_points"
  | "solution_themes"
  | "work_modes";

export type QuestionType =
  | "strategic"
  | "spatial"
  | "user_experience"
  | "operation"
  | "sustainability"
  | "technology"
  | "exhibition"
  | "budget_context"
  | "lifecycle"
  | "brand";

export type DiscoveryInput = Record<DiscoveryField, string[]>;

export type DiscoveryQuestion = {
  id: string;
  question: string;
  question_type: QuestionType;
  stakeholders: string[];
  industries: string[];
  project_scenarios: string[];
  space_needs: string[];
  pain_points: string[];
  solution_themes: string[];
  work_modes: string[];
  purpose: string;
  follow_up_questions: string[];
  related_solution_direction: string[];
  source_basis: string;
  source_url: string;
  review_status: "sample_pending_review" | "approved_public" | "blocked";
};

export type StakeholderPlaybook = {
  stakeholder: string;
  primary_concerns: string[];
  opening_angle: string;
  recommended_questions: string[];
  avoid_topics: string[];
  solution_angle: string[];
  tone: string;
};

export type FollowUpLogic = {
  trigger_need: string;
  risk: string;
  suggested_follow_ups: string[];
  related_solution_themes: string[];
};

export type SolutionMapping = {
  pain_point: string;
  mapped_solution: string[];
  recommended_spaces: string[];
  recommended_product_categories: string[];
  discovery_focus: string[];
  talking_points: string[];
  source_basis: string;
  source_url: string;
  review_status: "sample_pending_review" | "approved_public" | "blocked";
};

export type ExhibitionAdvice = {
  id: string;
  condition_tags: string[];
  title: string;
  advice: string;
  related_solution_themes: string[];
  source_url: string;
  review_status: "sample_pending_review" | "approved_public";
};

export type PublicSource = {
  name: string;
  url: string;
  allowed_content: string[];
  review_status: "sample_pending_review" | "approved_public";
};

export type SafetyResult = {
  safe: boolean;
  issues: string[];
  checkedSegments: number;
};

export type QuestionCounters = {
  total: number;
  byType: Record<string, number>;
};

export type DiscoveryCounters = {
  selection: {
    total: number;
    byField: Record<DiscoveryField, number>;
    status: string;
  };
  questions: QuestionCounters;
  stakeholders: {
    selected: number;
    coverageRate: number;
    questionsByStakeholder: Record<string, number>;
  };
  solutions: Record<string, number>;
  followUps: {
    triggerCount: number;
    questionCount: number;
    riskCount: number;
    solutionCount: number;
  };
  brief: {
    generated: number;
    copied: number;
    exported: number;
    printed: number;
  };
  safety: {
    checkedSegments: number;
    passedSegments: number;
    blockedSensitive: number;
    blockedPersonal: number;
    blockedKeywords: number;
    safe: boolean;
  };
  completion: {
    score: number;
    status: string;
  };
  localDisplayCount: number;
};

export type DiscoveryResult = {
  questions: DiscoveryQuestion[];
  stakeholderQuestions: Array<{
    stakeholder: string;
    opening_angle: string;
    questions: string[];
    tone: string;
  }>;
  followUps: FollowUpLogic[];
  mappedSolutions: SolutionMapping[];
  exhibitionAdvice: string[];
  counters: DiscoveryCounters;
  briefMarkdown: string;
};
