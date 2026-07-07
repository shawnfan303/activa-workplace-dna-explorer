import type { SolutionMapping } from "@/src/types/discovery";

export function SolutionMappingCard({ items }: { items: SolutionMapping[] }) {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-aurora-red">Solution mapping</p>
        <h2 className="text-3xl font-semibold text-aurora-ink">初步解方對應</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.pain_point} className="border border-aurora-line bg-white p-5">
            <p className="text-lg font-semibold text-aurora-ink">{item.pain_point}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.mapped_solution.map((solution) => <span key={solution} className="bg-red-50 px-2 py-1 text-xs font-semibold text-aurora-red">{solution}</span>)}
            </div>
            <p className="mt-3 text-sm leading-6 text-aurora-graphite">建議空間：{item.recommended_spaces.join("、")}</p>
            <p className="mt-1 text-sm leading-6 text-aurora-graphite">產品方向：{item.recommended_product_categories.join("、")}</p>
            <ul className="mt-3 space-y-1 text-sm leading-6 text-aurora-ink">
              {item.talking_points.map((point) => <li key={point}>- {point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
