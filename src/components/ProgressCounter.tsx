import type { DiscoveryCounters } from "@/src/types/discovery";

const labels = {
  industry: "產業",
  project_scenario: "情境",
  stakeholder: "窗口",
  space_needs: "空間",
  pain_points: "痛點",
  solution_themes: "解方",
  work_modes: "模式"
};

export function ProgressCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <p className="font-semibold text-aurora-ink">條件選擇計數器</p>
      <p className="mt-1 text-sm text-aurora-graphite">{counters.selection.status}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(counters.selection.byField).map(([key, value]) => (
          <div key={key} className="bg-aurora-soft p-3">
            <p className="text-xs text-aurora-graphite">{labels[key as keyof typeof labels]}</p>
            <p className="text-xl font-semibold text-aurora-ink">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-aurora-red">總選擇數 {counters.selection.total}</p>
    </section>
  );
}
