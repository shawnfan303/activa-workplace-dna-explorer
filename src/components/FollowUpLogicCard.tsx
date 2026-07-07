import type { FollowUpLogic } from "@/src/types/discovery";

export function FollowUpLogicCard({ items }: { items: FollowUpLogic[] }) {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-aurora-red">Follow-up logic</p>
        <h2 className="text-3xl font-semibold text-aurora-ink">追問建議</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.trigger_need} className="border border-aurora-line bg-white p-5">
            <p className="font-semibold text-aurora-ink">{item.trigger_need}</p>
            <p className="mt-2 text-sm leading-6 text-aurora-graphite">風險：{item.risk}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-ink">
              {item.suggested_follow_ups.map((question) => <li key={question}>- {question}</li>)}
            </ul>
            <p className="mt-4 text-xs font-semibold text-aurora-red">{item.related_solution_themes.join(" / ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
