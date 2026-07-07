import type { DiscoveryCounters } from "@/src/types/discovery";

export function StakeholderCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <p className="font-semibold text-aurora-ink">角色覆蓋計數器</p>
      <p className="mt-1 text-sm text-aurora-graphite">已選 {counters.stakeholders.selected} 個角色，覆蓋率 {counters.stakeholders.coverageRate}%</p>
      <div className="mt-3 space-y-2">
        {Object.entries(counters.stakeholders.questionsByStakeholder).map(([stakeholder, count]) => (
          <div key={stakeholder} className="flex items-center justify-between bg-aurora-soft px-3 py-2 text-sm">
            <span className="text-aurora-graphite">{stakeholder}</span>
            <span className="font-semibold text-aurora-ink">{count} 題</span>
          </div>
        ))}
      </div>
    </section>
  );
}
