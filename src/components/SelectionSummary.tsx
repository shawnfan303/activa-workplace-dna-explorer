import type { RecommenderInput } from "@/src/types/recommender";

const labels: Array<[keyof RecommenderInput, string]> = [
  ["space_type", "空間類型"],
  ["user_role", "使用者角色"],
  ["work_mode", "工作模式"],
  ["style_preference", "風格偏好"],
  ["pain_points", "主要痛點"],
  ["solution_theme", "解決方案主題"],
  ["industry", "產業"],
  ["project_scenario", "專案情境"]
];

export function SelectionSummary({ value }: { value: RecommenderInput }) {
  return (
    <aside className="border border-aurora-line bg-white p-5">
      <p className="font-semibold text-aurora-ink">已選條件</p>
      <div className="mt-4 space-y-3">
        {labels.map(([key, label]) => (
          <div key={key}>
            <p className="text-xs font-semibold text-aurora-red">{label}</p>
            <p className="mt-1 text-sm leading-6 text-aurora-graphite">{value[key].length > 0 ? value[key].join("、") : "尚未選擇"}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

