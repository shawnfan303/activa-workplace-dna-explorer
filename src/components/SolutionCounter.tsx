import type { DiscoveryCounters } from "@/src/types/discovery";

export function SolutionCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <p className="font-semibold text-aurora-ink">解方對應計數器</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {Object.entries(counters.solutions).map(([theme, count]) => (
          <div key={theme} className={`p-3 ${count > 0 ? "bg-red-50 text-aurora-red" : "bg-aurora-soft text-aurora-graphite"}`}>
            <p className="text-xs">{theme}</p>
            <p className="mt-1 text-xl font-semibold">{count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
