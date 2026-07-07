import type { DiscoveryQuestion } from "@/src/types/discovery";

export function QuestionSetCard({ questions }: { questions: DiscoveryQuestion[] }) {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-aurora-red">Core discovery script</p>
        <h2 className="text-3xl font-semibold text-aurora-ink">核心問診問題</h2>
      </div>
      {questions.map((question, index) => (
        <article key={question.id} className="break-inside-avoid border border-aurora-line bg-white p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <h3 className="text-lg font-semibold leading-7 text-aurora-ink">{index + 1}. {question.question}</h3>
            <span className="w-fit bg-aurora-soft px-2 py-1 text-xs font-semibold text-aurora-graphite">{question.question_type}</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-aurora-graphite">目的：{question.purpose}</p>
          <p className="mt-2 text-sm text-aurora-graphite">適合詢問對象：{question.stakeholders.join("、")}</p>
          <div className="mt-3 space-y-1 border-l-2 border-aurora-red pl-3 text-sm leading-6 text-aurora-graphite">
            {question.follow_up_questions.map((item) => <p key={item}>追問：{item}</p>)}
          </div>
        </article>
      ))}
    </section>
  );
}
