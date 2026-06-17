import type { ModeScores, Question, QuestionnaireAnswer, WorkplaceMode } from "@/lib/types";

export const workplaceModes: WorkplaceMode[] = ["focus", "collaboration", "project", "learning", "social", "relax"];

export const modeLabels: Record<WorkplaceMode, string> = {
  focus: "專注模式",
  collaboration: "協作模式",
  project: "項目共創",
  learning: "學習模式",
  social: "社交模式",
  relax: "放鬆模式"
};

export const emptyModeScores: ModeScores = {
  focus: 0,
  collaboration: 0,
  project: 0,
  learning: 0,
  social: 0,
  relax: 0
};

export function calculateModeScores(answers: QuestionnaireAnswer[], questions: Question[]): ModeScores {
  return answers.reduce<ModeScores>((totalScores, answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.optionId);

    if (!option) {
      return totalScores;
    }

    workplaceModes.forEach((mode) => {
      totalScores[mode] += option.scores[mode];
    });

    return totalScores;
  }, { ...emptyModeScores });
}

export function rankModes(scores: ModeScores) {
  return workplaceModes
    .map((mode) => ({
      mode,
      label: modeLabels[mode],
      score: scores[mode]
    }))
    .sort((a, b) => b.score - a.score);
}

export function getDominantMode(scores: ModeScores): WorkplaceMode {
  return rankModes(scores)[0].mode;
}

export function calculateWorkplaceDnaResult(answers: QuestionnaireAnswer[], questions: Question[]) {
  const scores = calculateModeScores(answers, questions);

  return {
    dominantMode: getDominantMode(scores),
    scores,
    rankedModes: rankModes(scores),
    answers,
    completedAt: new Date().toISOString()
  };
}

export function getSceneMatchScore(resultScores: ModeScores, sceneScores: ModeScores) {
  return workplaceModes.reduce((total, mode) => total + resultScores[mode] * sceneScores[mode], 0);
}
