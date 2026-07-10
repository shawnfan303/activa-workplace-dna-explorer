"use client";

import { useEffect, useMemo, useState } from "react";
import casesData from "@/data/cases.json";
import tagsData from "@/data/tags.json";
import { CaseMatchForm } from "@/components/CaseMatchForm";
import { CaseResultCard } from "@/components/CaseResultCard";
import { PublicDataNotice } from "@/components/PublicDataNotice";
import { SelectedCaseBrief } from "@/components/SelectedCaseBrief";
import { StakeholderTalkingPoints } from "@/components/StakeholderTalkingPoints";
import { UsageCounter } from "@/components/UsageCounter";
import type { CaseItem, CaseMatchInput } from "@/lib/caseTypes";
import { generateCaseBriefModel } from "@/lib/briefGenerator";
import { matchCases } from "@/lib/matching";
import { getCaseMatchFallbackUsageCount, getCaseMatchUsageCount, incrementCaseMatchUsageCount } from "@/lib/usageCounter";

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
const usageSessionKey = "aurora-case-match-usage-recorded";
type FlowStep = "input" | "results" | "brief";

export default function CaseMatchPage() {
  const [input, setInput] = useState<CaseMatchInput>(initialInput);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const [flowStep, setFlowStep] = useState<FlowStep>("input");
  const [usageCount, setUsageCount] = useState(getCaseMatchFallbackUsageCount());
  const cases = casesData as CaseItem[];

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setInput(JSON.parse(stored) as CaseMatchInput);
    }

    getCaseMatchUsageCount()
      .then(setUsageCount)
      .catch(() => setUsageCount(getCaseMatchFallbackUsageCount()));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(input));
  }, [input]);

  const matchedCases = useMemo(() => matchCases(input, cases, 5), [input, cases]);
  const selectedCases = matchedCases.filter((item) => selectedCaseIds.includes(item.id));
  const briefModel = useMemo(() => generateCaseBriefModel(input, selectedCases), [input, selectedCases]);
  const lastReviewed = cases.map((item) => item.last_reviewed).sort().at(-1);
  const conditionSummary = [
    { label: "產業", value: input.industry.join("、") },
    { label: "空間", value: input.space_types.join("、") },
    { label: "痛點", value: input.pain_points.join("、") },
    { label: "窗口", value: input.stakeholder || "尚未選擇" }
  ];

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

  function recordUsageOnce() {
    if (window.sessionStorage.getItem(usageSessionKey)) {
      return;
    }

    window.sessionStorage.setItem(usageSessionKey, "true");
    incrementCaseMatchUsageCount()
      .then(setUsageCount)
      .catch(() => setUsageCount((current) => current));
  }

  function startCaseMatch() {
    recordUsageOnce();
    goToStep("input");
  }

  function generateResults() {
    recordUsageOnce();
    goToStep("results");
  }

  const stepItems = [
    { id: "input", label: "1 需求條件" },
    { id: "results", label: "2 推薦案例" },
    { id: "brief", label: "3 案例摘要" }
  ] satisfies Array<{ id: FlowStep; label: string }>;

  return (
    <main>
      <section className="border-b border-aurora-line bg-aurora-soft">
        <div className="aurora-container pb-20 pt-14 md:pb-24 md:pt-18">
          <div>
            <h1 className="whitespace-nowrap text-[clamp(2.75rem,5.4vw,4.75rem)] font-semibold leading-none text-aurora-ink">AURORA Case Match Engine</h1>
            <p className="mt-5 max-w-none text-base leading-7 text-aurora-graphite md:whitespace-nowrap md:text-lg">
              用公開案例，快速找到最適合企業客戶的辦公空間參考。正式流程分為需求條件、推薦案例與案例摘要三段，協助營業拜訪前快速建立討論方向。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={startCaseMatch} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-[0_18px_36px_rgba(200,16,46,0.18)]">
                開始案例匹配
              </button>
              <UsageCounter count={usageCount} variant="compact" />
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
              <button type="button" onClick={generateResults} className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-[0_18px_36px_rgba(200,16,46,0.18)]">
                產生推薦案例
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {flowStep === "results" ? (
        <div className="aurora-container space-y-5 pb-10">
          <section className="border border-aurora-line bg-white p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-aurora-red">Case shortlist</p>
                <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">Top 5 推薦案例短名單</h2>
                <p className="mt-2 text-sm leading-7 text-aurora-graphite">
                  此頁不是問診摘要，而是拜訪前的案例候選清單。先比較案例是否能作為開場素材，再選 1–3 個加入最後摘要。
                </p>
              </div>
              <div className="border border-aurora-line bg-aurora-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aurora-red">Selected</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums text-aurora-ink">{selectedCases.length} / 3</p>
                <p className="mt-1 text-sm text-aurora-graphite">已加入案例摘要</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {conditionSummary.map((item) => (
                <div key={item.label} className="border border-aurora-line bg-white p-3">
                  <p className="text-xs font-semibold text-aurora-red">{item.label}</p>
                  <p className="mt-1 truncate text-sm text-aurora-ink" title={item.value}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div id="case-results" className="space-y-3">
              <div className="hidden border border-aurora-line bg-aurora-soft px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-aurora-graphite lg:grid lg:grid-cols-[72px_minmax(0,1fr)_176px_190px]">
                <span>Rank</span>
                <span>Case / reason</span>
                <span>Use case</span>
                <span>Action</span>
              </div>

              {matchedCases.map((item, index) => (
                <CaseResultCard
                  key={item.id}
                  item={item}
                  rank={index + 1}
                  selected={selectedCaseIds.includes(item.id)}
                  disabled={selectedCaseIds.length >= 3}
                  onToggle={toggleSelectedCase}
                />
              ))}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <StakeholderTalkingPoints stakeholder={input.stakeholder} />
              <div className="border border-aurora-line bg-white p-5">
                <p className="text-sm font-semibold text-aurora-red">閱讀方式</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-graphite">
                  <li>- 先看分數與推薦原因，判斷是否適合作為拜訪開場。</li>
                  <li>- 再看「適合使用」與「可借鏡重點」，決定是否加入摘要。</li>
                  <li>- 需要完整背景時，再展開「查看詳細說明」。</li>
                </ul>
              </div>
              <div className="border border-aurora-line bg-white p-5">
                <p className="text-sm font-semibold text-aurora-red">匹配分數</p>
                <p className="mt-2 text-sm leading-7 text-aurora-graphite">
                  分數代表公開案例與目前條件的相近程度，不是成交率或案例品質分數。
                </p>
              </div>
              <div className="grid gap-3 border border-aurora-line bg-white p-5">
                <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
                  返回修改條件
                </button>
                <button
                  type="button"
                  onClick={() => goToStep("brief")}
                  disabled={selectedCases.length === 0}
                  className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  產生案例匹配摘要
                </button>
              </div>
            </aside>
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
