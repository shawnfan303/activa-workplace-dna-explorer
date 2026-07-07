import type { DiscoveryField, DiscoveryInput } from "@/src/types/discovery";

const labels: Record<DiscoveryField, string> = {
  industry: "產業類型",
  project_scenario: "專案情境",
  stakeholder: "主要對話窗口",
  space_needs: "空間需求",
  pain_points: "主要痛點",
  solution_themes: "解決方案主題",
  work_modes: "工作模式"
};

export function DiscoverySummaryPanel({ value }: { value: DiscoveryInput }) {
  return (
    <aside className="border border-aurora-line bg-white p-5">
      <p className="font-semibold text-aurora-ink">本次需求條件摘要</p>
      <div className="mt-4 space-y-3">
        {Object.entries(labels).map(([key, label]) => (
          <div key={key}>
            <p className="text-xs font-semibold text-aurora-red">{label}</p>
            <p className="mt-1 text-sm leading-6 text-aurora-graphite">{value[key as DiscoveryField].length ? value[key as DiscoveryField].join("、") : "尚未選擇"}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
