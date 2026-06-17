import { modeLabels } from "@/lib/scoring";
import type { Question } from "@/lib/types";

export function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <fieldset className="border border-aurora-line p-6">
      <legend className="px-2 text-sm font-semibold text-aurora-red">Q{index + 1}</legend>
      <h2 className="text-xl font-semibold text-aurora-ink">{question.question}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {question.options.map((option) => {
          const primaryMode = Object.entries(option.scores).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof modeLabels;

          return (
            <label key={option.id} className="flex cursor-pointer items-start gap-3 border border-aurora-line p-4 text-sm leading-6 transition hover:border-aurora-red">
              <input className="mt-1 accent-aurora-red" type="radio" name={question.id} value={option.id} required />
              <span>
                <span className="block font-semibold text-aurora-ink">{modeLabels[primaryMode]}</span>
                <span className="text-aurora-graphite">{option.label}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
