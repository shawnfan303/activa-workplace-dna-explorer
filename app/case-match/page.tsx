"use client";

import { useEffect, useMemo, useState } from "react";
import casesData from "@/data/cases.json";
import tagsData from "@/data/tags.json";
import { CaseMatchForm } from "@/components/CaseMatchForm";
import { CaseResultCard } from "@/components/CaseResultCard";
import { PublicDataNotice } from "@/components/PublicDataNotice";
import { SelectedCaseBrief } from "@/components/SelectedCaseBrief";
import { StakeholderTalkingPoints } from "@/components/StakeholderTalkingPoints";
import { assetPath } from "@/lib/assets";
import type { CaseItem, CaseMatchInput } from "@/lib/caseTypes";
import { generateCaseBriefModel } from "@/lib/briefGenerator";
import { matchCases } from "@/lib/matching";

const initialInput: CaseMatchInput = {
  industry: ["科技業"],
  project_scenario: ["辦公室搬遷"],
  space_types: ["辦公區", "會議室"],
  pain_points: ["跨部門協作不足", "會議效率不佳"],
  solution_themes: ["高效"],
  work_modes: ["協作"],
  stakeholder: "總經理"
};

const storageKey = "aurora-case-match-input";
type FlowStep = "input" | "results" | "brief";

export default function CaseMatchPage() {
  const [input, setInput] = useState<CaseMatchInput>(initialInput);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const [flowStep, setFlowStep] = useState<FlowStep>("input");
  const cases = casesData as CaseItem[];

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setInput(JSON.parse(stored) as CaseMatchInput);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(input));
  }, [input]);

  const matchedCases = useMemo(() => matchCases(input, cases, 5), [input, cases]);
  const selectedCases = matchedCases.filter((item) => selectedCaseIds.includes(item.id));
  const briefModel = useMemo(() => generateCaseBriefModel(input, selectedCases), [input, selectedCases]);
  const lastReviewed = cases.map((item) => item.last_reviewed).sort().at(-1);

  function toggleSelectedCase(caseId: string) {
    setSelectedCaseIds((current) => {
      if (current.includes(caseId)) {
        return current.filter((item) => item !== caseId);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, caseId];
    });
  }

  function goToStep(nextStep: FlowStep) {
    setFlowStep(nextStep);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  const stepItems = [
    { id: "input", label: "1 需求條件" },
    { id: "results", label: "2 推薦案例" },
    { id: "brief", label: "3 案例摘要" }
  ] satisfies Array<{ id: FlowStep; label: string }>;

  return (
    <main>
      <section className="border-b border-aurora-line bg-aurora-soft">
        <div className="aurora-container py-14 md:py-18">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4">
              <img className="h-10 w-auto md:h-12" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Public case matching tool</p>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-aurora-ink md:text-6xl">AURORA Case Match Engine</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-aurora-graphite">
              用公開案例，快速找到最適合企業客戶的辦公空間參考。正式流程分為需求條件、推薦案例與案例摘要三段，協助營業拜訪前快速建立討論方向。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => goToStep("input")} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
                開始案例匹配
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="aurora-container py-8">
        <div className="grid gap-3 border border-aurora-line bg-white p-3 md:grid-cols-3">
          {stepItems.map((item) => (
            <div key={item.id} className={`px-4 py-3 text-sm font-semibold ${flowStep === item.id ? "bg-aurora-red text-white" : "bg-aurora-soft text-aurora-graphite"}`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {flowStep === "input" ? (
        <div className="aurora-container grid gap-8 pb-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <PublicDataNotice lastReviewed={lastReviewed} />
            <div className="border border-aurora-line bg-white p-5">
              <p className="text-sm font-semibold text-aurora-red">正式流程</p>
              <h2 className="mt-1 text-2xl font-semibold text-aurora-ink">先完成需求條件，再產生推薦案例</h2>
              <p className="mt-3 text-sm leading-7 text-aurora-graphite">
                Step 1–6 集中在此頁完成。系統不要求輸入姓名、電話、Email 或公司名稱，只依公開案例標籤與需求條件進行初步匹配。
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <CaseMatchForm tags={tagsData} value={input} onChange={setInput} />
            <div className="flex justify-end">
              <button type="button" onClick={() => goToStep("results")} className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
                產生推薦案例
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {flowStep === "results" ? (
        <div className="aurora-container grid gap-8 pb-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <StakeholderTalkingPoints stakeholder={input.stakeholder} />
            <div className="border border-aurora-line bg-white p-5">
              <p className="text-sm font-semibold text-aurora-red">匹配分數說明</p>
              <h2 className="mt-1 text-xl font-semibold text-aurora-ink">案例與使用者條件的匹配分數</h2>
              <p className="mt-3 text-sm leading-7 text-aurora-graphite">
                分數由產業、空間需求、痛點、解決方案主題、工作模式、專案情境與是否有公開來源連結計算，代表公開案例與目前條件的相近程度。它不是成交率、案例品質分數，也不代表此案例一定適合客戶。
              </p>
            </div>
            <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
              返回修改條件
            </button>
          </div>

          <section id="case-results" className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-aurora-red">Top 5 推薦案例</p>
              <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">根據目前條件排序</h2>
              <p className="mt-2 text-sm leading-7 text-aurora-graphite">請勾選 1–3 個案例加入摘要。系統使用震旦家具與大震設計公開來源資料。</p>
            </div>

            {matchedCases.map((item) => (
              <CaseResultCard
                key={item.id}
                item={item}
                selected={selectedCaseIds.includes(item.id)}
                disabled={selectedCaseIds.length >= 3}
                onToggle={toggleSelectedCase}
              />
            ))}

            <div className="flex flex-col gap-3 border border-aurora-line bg-white p-5 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-aurora-graphite">已選 {selectedCases.length} 個案例。請選擇 1–3 個案例後產生摘要。</p>
              <button
                type="button"
                onClick={() => goToStep("brief")}
                disabled={selectedCases.length === 0}
                className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                產生案例匹配摘要
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {flowStep === "brief" ? (
        <div className="aurora-container space-y-6 pb-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-aurora-red">最終輸出</p>
              <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">案例匹配摘要</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => goToStep("results")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
                返回推薦案例
              </button>
              <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
                重新設定條件
              </button>
            </div>
          </div>
          <SelectedCaseBrief model={briefModel} />
        </div>
      ) : null}
    </main>
  );
}
