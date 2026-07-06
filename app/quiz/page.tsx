"use client";

import { useRouter } from "next/navigation";
import questions from "@/data/questions.json";
import { QuestionCard } from "@/components/QuestionCard";
import { calculateWorkplaceDnaResult } from "@/lib/scoring";
import { incrementSharedUsageCount } from "@/lib/usageCounter";
import type { Question, QuestionnaireAnswer } from "@/lib/types";

const typedQuestions = questions as Question[];

export default function QuizPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const answers = typedQuestions.map<QuestionnaireAnswer>((question) => ({
      questionId: question.id,
      optionId: formData.get(question.id) as string
    }));

    if (answers.some((answer) => !answer.optionId)) {
      return;
    }

    const result = calculateWorkplaceDnaResult(answers, typedQuestions);
    localStorage.setItem("activa-workplace-dna-result", JSON.stringify(result));
    try {
      await incrementSharedUsageCount();
    } catch {
      // Counter availability should not block the diagnosis workflow.
    }
    router.push("/result");
  }

  return (
    <section className="aurora-container py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Questionnaire</p>
        <h1 className="mt-3 text-4xl font-semibold text-aurora-ink">Workplace DNA 問卷</h1>
        <p className="mt-4 leading-7 text-aurora-graphite">
          選擇最接近企業現況的描述，系統會暫存在瀏覽器 LocalStorage，並產生 ACTIVA 辦公場景推薦。
        </p>
      </div>
      <form action={handleSubmit} className="mt-10 space-y-8">
        {typedQuestions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))}
        <button type="submit" className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
          產生 Workplace DNA 結果
        </button>
      </form>
    </section>
  );
}
