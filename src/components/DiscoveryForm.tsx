import type { DiscoveryField, DiscoveryInput } from "@/src/types/discovery";

type DiscoveryFormProps = {
  tags: Record<DiscoveryField, string[]>;
  value: DiscoveryInput;
  onChange: (nextValue: DiscoveryInput) => void;
};

const fields: Array<{ key: DiscoveryField; title: string; helper: string }> = [
  { key: "industry", title: "Step 1｜選擇產業類型", helper: "只選產業分類，不輸入公司名稱。" },
  { key: "project_scenario", title: "Step 2｜選擇專案情境", helper: "協助判斷拜訪前需要釐清的管理議題。" },
  { key: "stakeholder", title: "Step 3｜選擇主要對話窗口", helper: "可同時選擇決策、使用、採購與維運角色。" },
  { key: "space_needs", title: "Step 4｜選擇空間需求", helper: "聚焦要優先討論的辦公場景。" },
  { key: "pain_points", title: "Step 5｜選擇主要痛點", helper: "用於產生問診主軸、追問與初步解方。" },
  { key: "solution_themes", title: "Step 6｜選擇解決方案主題", helper: "將需求提升到健康、高效、科技、永續與空間策略。" },
  { key: "work_modes", title: "Step 7｜選擇工作模式", helper: "用工作行為校準場域規劃方向。" }
];

export function DiscoveryForm({ tags, value, onChange }: DiscoveryFormProps) {
  function toggle(key: DiscoveryField, option: string) {
    const current = value[key];
    const next = current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
    onChange({ ...value, [key]: next });
  }

  return (
    <section className="space-y-5">
      {fields.map((field) => (
        <div key={field.key} className="rounded-[10px] border border-aurora-line bg-white p-5 shadow-subtle">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-aurora-ink">{field.title}</h2>
              <p className="mt-1 text-sm leading-6 text-aurora-graphite">{field.helper}</p>
            </div>
            <span className="w-fit rounded-full border border-aurora-line bg-aurora-soft px-3 py-1 text-xs font-semibold text-aurora-graphite">已選 {value[field.key].length} 項</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags[field.key].map((option) => {
              const active = value[field.key].includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggle(field.key, option)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition duration-200 ${active ? "border-aurora-red bg-red-50 text-aurora-red shadow-sm" : "border-aurora-line bg-white text-aurora-graphite hover:border-aurora-red hover:text-aurora-red"}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
