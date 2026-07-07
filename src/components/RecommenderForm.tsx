import type { RecommenderInput } from "@/src/types/recommender";

type Tags = Record<keyof RecommenderInput, string[]>;

type RecommenderFormProps = {
  tags: Tags;
  value: RecommenderInput;
  onChange: (nextValue: RecommenderInput) => void;
};

const fields: Array<{ key: keyof RecommenderInput; title: string; helper: string }> = [
  { key: "space_type", title: "Step 1｜選擇空間類型", helper: "可複選，先聚焦最需要討論的空間。" },
  { key: "user_role", title: "Step 2｜選擇主要使用者角色", helper: "用來判斷產品與場景使用情境。" },
  { key: "work_mode", title: "Step 3｜選擇辦公工作模式", helper: "對應專注、協作、學習、社交與展示接待等場景。" },
  { key: "style_preference", title: "Step 4｜選擇設計風格與氛圍", helper: "協助推薦更接近客戶期待的風格語言。" },
  { key: "pain_points", title: "Step 5｜選擇主要痛點", helper: "用於生成保守、可討論的推薦原因。" },
  { key: "solution_theme", title: "Step 6｜選擇解決方案主題", helper: "對應健康、靈動、科技、永續與空間規劃。" },
  { key: "industry", title: "Step 7｜選擇產業", helper: "只使用產業類別，不輸入公司名稱。" },
  { key: "project_scenario", title: "Step 8｜選擇專案情境", helper: "用來判斷大震設計服務方向。" }
];

export function RecommenderForm({ tags, value, onChange }: RecommenderFormProps) {
  function toggle(key: keyof RecommenderInput, option: string) {
    const current = value[key];
    const next = current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
    onChange({ ...value, [key]: next });
  }

  return (
    <section id="recommender-form" className="space-y-5">
      {fields.map((field) => (
        <div key={field.key} className="border border-aurora-line bg-white p-5">
          <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-aurora-ink">{field.title}</h2>
              <p className="mt-1 text-sm text-aurora-graphite">{field.helper}</p>
            </div>
            <p className="text-xs text-aurora-graphite">已選 {value[field.key].length} 項</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags[field.key].map((option) => {
              const active = value[field.key].includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggle(field.key, option)}
                  className={`border px-3 py-2 text-sm font-medium transition ${active ? "border-aurora-red bg-red-50 text-aurora-red" : "border-aurora-line bg-white text-aurora-graphite hover:border-aurora-red"}`}
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

