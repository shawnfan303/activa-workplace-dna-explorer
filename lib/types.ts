export type WorkplaceScene = {
  id: string;
  mode: WorkplaceMode;
  title: string;
  people: string;
  needs: string[];
  features: string[];
  keywords: string[];
  recommendedFor: string[];
  scores: ModeScores;
};

export type WorkplaceMode =
  | "focus"
  | "collaboration"
  | "project"
  | "learning"
  | "social"
  | "relax";

export type ModeScores = Record<WorkplaceMode, number>;

export type QuestionOption = {
  id: string;
  label: string;
  scores: ModeScores;
};

export type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
};

export type QuestionnaireAnswer = {
  questionId: string;
  optionId: string;
};

export type WorkplaceDnaResult = {
  dominantMode: WorkplaceMode;
  scores: ModeScores;
  rankedModes: Array<{
    mode: WorkplaceMode;
    label: string;
    score: number;
  }>;
  answers: QuestionnaireAnswer[];
  completedAt: string;
};
