import type { DiscoveryCounters } from "@/src/types/discovery";

export function CompletionCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-aurora-ink">完成度計數器</p>
          <p className="mt-1 text-sm leading-6 text-aurora-graphite">{counters.completion.status}</p>
        </div>
        <p className="text-4xl font-semibold text-aurora-red">{counters.completion.score}%</p>
      </div>
      <div className="mt-4 h-2 bg-aurora-soft">
        <div className="h-2 bg-aurora-red transition-all" style={{ width: `${counters.completion.score}%` }} />
      </div>
    </section>
  );
}
