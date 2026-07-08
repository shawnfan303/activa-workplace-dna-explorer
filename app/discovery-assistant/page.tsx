"use client";

import { useMemo, useState } from "react";
import discoveryQuestionsData from "@/src/data/discoveryQuestions.json";
import exhibitionAdviceData from "@/src/data/exhibitionAdvice.json";
import followUpLogicData from "@/src/data/followUpLogic.json";
import solutionMappingData from "@/src/data/solutionMapping.json";
import stakeholderPlaybooksData from "@/src/data/stakeholderPlaybooks.json";
import tagsData from "@/src/data/tags.discovery.json";
import { DiscoveryBrief } from "@/src/components/DiscoveryBrief";
import { DiscoveryForm } from "@/src/components/DiscoveryForm";
import { DiscoverySummaryPanel } from "@/src/components/DiscoverySummaryPanel";
import { ExhibitionAdviceCard } from "@/src/components/ExhibitionAdviceCard";
import { FollowUpLogicCard } from "@/src/components/FollowUpLogicCard";
import { PublicDataNotice } from "@/src/components/PublicDataNotice";
import { QuestionSetCard } from "@/src/components/QuestionSetCard";
import { SolutionMappingCard } from "@/src/components/SolutionMappingCard";
import { StakeholderQuestionCard } from "@/src/components/StakeholderQuestionCard";
import { FooterNotice } from "@/src/components/FooterNotice";
import { generateDiscoveryAxis, generateDiscoveryResult } from "@/src/lib/discoveryEngine";
import { incrementBriefCounter, incrementLocalDisplayCount, readBriefCounters, readLocalDisplayCount } from "@/src/lib/counterEngine";
import { assetPath } from "@/lib/assets";
import type { DiscoveryField, DiscoveryInput, DiscoveryQuestion, ExhibitionAdvice, FollowUpLogic, SolutionMapping, StakeholderPlaybook } from "@/src/types/discovery";

const initialInput: DiscoveryInput = {
  industry: ["科技業"],
  project_scenario: ["辦公室搬遷", "混合辦公導入"],
  stakeholder: ["高階主管", "總務"],
  space_needs: ["職員區", "會議室", "開放協作區"],
  pain_points: ["會議效率不佳", "缺乏專注空間"],
  solution_themes: ["高效辦公", "靈動辦公", "科技辦公"],
  work_modes: ["專注", "協作", "混合辦公"]
};

type FlowStep = "input" | "results" | "brief";

export default function DiscoveryAssistantPage() {
  const [input, setInput] = useState<DiscoveryInput>(initialInput);
  const [flowStep, setFlowStep] = useState<FlowStep>("input");
  const [briefCounters, setBriefCounters] = useState(() => readBriefCounters());
  const [localDisplayCount, setLocalDisplayCount] = useState(() => readLocalDisplayCount());

  const result = useMemo(
    () =>
      generateDiscoveryResult(
        input,
        discoveryQuestionsData as DiscoveryQuestion[],
        stakeholderPlaybooksData as StakeholderPlaybook[],
        followUpLogicData as FollowUpLogic[],
        solutionMappingData as SolutionMapping[],
        exhibitionAdviceData as ExhibitionAdvice[],
        briefCounters,
        localDisplayCount
      ),
    [input, briefCounters, localDisplayCount]
  );

  function resetInput() {
    setInput(initialInput);
  }

  function goToStep(nextStep: FlowStep) {
    setFlowStep(nextStep);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function markGenerated() {
    setBriefCounters(incrementBriefCounter("generated"));
    setLocalDisplayCount(incrementLocalDisplayCount());
    goToStep("brief");
  }

  function markAction(action: "copied" | "exported" | "printed") {
    setBriefCounters(incrementBriefCounter(action));
  }

  const stepItems = [
    { id: "input", label: "1 需求條件" },
    { id: "results", label: "2 問診建議" },
    { id: "brief", label: "3 拜訪摘要" }
  ] satisfies Array<{ id: FlowStep; label: string }>;

  return (
    <div className="bg-white">
      <section className="border-b border-aurora-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]">
        <div className="aurora-container py-12 md:py-14">
          <div>
            <div className="flex flex-wrap items-center gap-5">
              <img className="h-9 w-auto md:h-10" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
              <p className="text-2xl font-semibold tracking-[0.16em] text-aurora-red md:text-3xl">顧客經營工具箱</p>
            </div>
            <h1 className="mt-8 text-5xl font-semibold leading-none text-aurora-ink md:text-7xl xl:whitespace-nowrap">AURORA Discovery Assistant</h1>
            <p className="mt-8 max-w-[1120px] text-base leading-8 text-aurora-graphite md:text-lg">
              以公開資料與顧問式問診邏輯，協助營業快速完成拜訪前準備。正式流程分為需求條件、問診建議與拜訪摘要三段，協助團隊把客戶討論從家具品項提升到工作場域策略。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => goToStep("input")} className="min-h-[56px] w-[155px] bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">開始需求探索</button>
              <div className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center border border-aurora-line bg-white px-5 py-3 shadow-subtle">
                <p className="text-base font-semibold tabular-nums text-aurora-ink">已使用：{result.counters.localDisplayCount.toLocaleString("zh-TW")}人次</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="aurora-container py-8">
        <div className="grid gap-3 border border-aurora-line bg-white p-3 md:grid-cols-3">
          {stepItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goToStep(item.id)} className={`px-4 py-3 text-left text-sm font-semibold ${flowStep === item.id ? "bg-aurora-red text-white" : "bg-aurora-soft text-aurora-graphite"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {flowStep === "input" ? (
        <div className="aurora-container grid gap-8 pb-10 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <PublicDataNotice />
            <DiscoverySummaryPanel value={input} />
            <button type="button" onClick={resetInput} className="w-full border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">重設示範條件</button>
          </div>
          <div id="discovery-form" className="space-y-6">
            <DiscoveryForm tags={tagsData as Record<DiscoveryField, string[]>} value={input} onChange={setInput} />
            <div className="flex justify-end">
              <button type="button" onClick={() => goToStep("results")} className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">產生問診建議</button>
            </div>
          </div>
        </div>
      ) : null}

      {flowStep === "results" ? (
        <div className="aurora-container space-y-8 pb-10">
          {!result.counters.safety.safe ? (
            <section className="border border-aurora-red bg-red-50 p-5 text-sm leading-7 text-aurora-red">
              偵測到可能不適合公開系統使用的內容，已阻擋輸出。請移除個資、報價、公司內部資訊或未公開專案資料。
            </section>
          ) : (
            <>
              <section className="border border-aurora-line bg-white p-6">
                <p className="text-sm font-semibold text-aurora-red">Recommended discovery axis</p>
                <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">建議問診主軸</h2>
                <p className="mt-4 text-base leading-8 text-aurora-graphite">{generateDiscoveryAxis(input)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">返回修改條件</button>
                  <button type="button" onClick={markGenerated} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-800">產生拜訪摘要</button>
                </div>
              </section>
              <QuestionSetCard questions={result.questions} />
              <StakeholderQuestionCard groups={result.stakeholderQuestions} />
              <FollowUpLogicCard items={result.followUps} />
              <SolutionMappingCard items={result.mappedSolutions} />
              <ExhibitionAdviceCard advice={result.exhibitionAdvice} />
            </>
          )}
        </div>
      ) : null}

      {flowStep === "brief" ? (
        <div className="aurora-container space-y-6 pb-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-aurora-red">Final output</p>
              <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">拜訪摘要</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => goToStep("results")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">返回問診建議</button>
              <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">重新設定條件</button>
            </div>
          </div>
          <DiscoveryBrief
            input={input}
            questions={result.questions}
            stakeholderGroups={result.stakeholderQuestions}
            followUps={result.followUps}
            mappedSolutions={result.mappedSolutions}
            exhibitionAdvice={result.exhibitionAdvice}
            counters={result.counters}
            markdown={result.briefMarkdown}
            onCopy={() => markAction("copied")}
            onExport={() => markAction("exported")}
            onPrint={() => markAction("printed")}
          />
        </div>
      ) : null}

      <FooterNotice />
    </div>
  );
}
