"use client";

import type { CaseMatchInput } from "@/lib/caseTypes";

type Tags = Record<string, string[]>;

type CaseMatchFormProps = {
  tags: Tags;
  value: CaseMatchInput;
  onChange: (nextValue: CaseMatchInput) => void;
};

const fieldLabels: Array<{ key: keyof Omit<CaseMatchInput, "stakeholder">; label: string; helper: string }> = [
  { key: "industry", label: "Step 1｜選擇客戶產業", helper: "可複選，若不確定可先略過。" },
  { key: "project_scenario", label: "Step 2｜選擇專案情境", helper: "用來判斷案例適合的拜訪用途。" },
  { key: "space_types", label: "Step 3｜選擇辦公空間需求", helper: "請選擇最需要討論的空間。" },
  { key: "pain_points", label: "Step 4｜選擇目前痛點", helper: "協助產生推薦理由與開場話術。" },
  { key: "solution_themes", label: "Step 5｜選擇解決方案主題", helper: "對應健康、高效、科技、永續。" },
  { key: "work_modes", label: "Step 6｜選擇工作模式", helper: "對應 ACTIVA 的工作場景語言。" }
];

const tagKeyMap = {
  industry: "industries",
  project_scenario: "project_scenarios",
  space_types: "space_types",
  pain_points: "pain_points",
  solution_themes: "solution_themes",
  work_modes: "work_modes"
};

export function CaseMatchForm({ tags, value, onChange }: CaseMatchFormProps) {
  function toggle(key: keyof Omit<CaseMatchInput, "stakeholder">, option: string) {
    const current = value[key];
    const next = current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
    onChange({ ...value, [key]: next });
  }

  return (
    <section id="case-match-form" className="space-y-5">
      {fieldLabels.map((field) => (
        <div key={field.key} className="border border-aurora-line bg-white p-5">
          <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-aurora-ink">{field.label}</h2>
              <p className="mt-1 text-sm text-aurora-graphite">{field.helper}</p>
            </div>
            <p className="text-xs text-aurora-graphite">已選 {value[field.key].length} 項</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags[tagKeyMap[field.key]].map((option) => {
              const active = value[field.key].includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggle(field.key, option)}
                  className={`border px-3 py-2 text-sm font-medium transition ${
                    active ? "border-aurora-red bg-red-50 text-aurora-red" : "border-aurora-line bg-white text-aurora-graphite hover:border-aurora-red"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="border border-aurora-line bg-white p-5">
        <h2 className="text-xl font-semibold text-aurora-ink">Step 7｜選擇主要溝通對象</h2>
        <select
          value={value.stakeholder}
          onChange={(event) => onChange({ ...value, stakeholder: event.target.value })}
          className="mt-4 w-full border border-aurora-line bg-white px-4 py-3 text-sm text-aurora-ink outline-none focus:border-aurora-red"
        >
          {tags.stakeholders.map((stakeholder) => (
            <option key={stakeholder} value={stakeholder}>
              {stakeholder}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
