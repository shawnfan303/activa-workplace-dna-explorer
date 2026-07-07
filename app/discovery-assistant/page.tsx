"use client";

import { useMemo, useState } from "react";
import discoveryQuestionsData from "@/src/data/discoveryQuestions.json";
import exhibitionAdviceData from "@/src/data/exhibitionAdvice.json";
import followUpLogicData from "@/src/data/followUpLogic.json";
import solutionMappingData from "@/src/data/solutionMapping.json";
import stakeholderPlaybooksData from "@/src/data/stakeholderPlaybooks.json";
import tagsData from "@/src/data/tags.discovery.json";
import { DiscoveryBrief } from "@/src/components/DiscoveryBrief";
import { DiscoveryCounterPanel } from "@/src/components/DiscoveryCounterPanel";
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

export default function DiscoveryAssistantPage() {
  const [input, setInput] = useState<DiscoveryInput>(initialInput);
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

  function markGenerated() {
    setBriefCounters(incrementBriefCounter("generated"));
    setLocalDisplayCount(incrementLocalDisplayCount());
  }

  function markAction(action: "copied" | "exported" | "printed") {
    setBriefCounters(incrementBriefCounter(action));
  }

  return (
    <div className="bg-white">
      <section className="border-b border-aurora-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]">
        <div className="aurora-container py-14 md:py-18">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Public data discovery assistant</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight text-aurora-ink md:text-6xl">Aurora Discovery Assistant</h1>
          <p className="mt-3 text-2xl font-semibold text-aurora-ink">企業辦公需求探索器</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-aurora-graphite">以公開資料與顧問式問診邏輯，協助營業快速完成拜訪前準備。工具不要求姓名、公司名稱、電話、Email、地址、預算或任何可識別資訊。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#discovery-form" className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">開始需求探索</a>
            <a href="#public-data-notice" className="border border-aurora-line bg-white px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">查看公開資料邊界</a>
          </div>
        </div>
      </section>

      <div className="aurora-container grid gap-8 py-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <PublicDataNotice />
          <DiscoverySummaryPanel value={input} />
          <DiscoveryCounterPanel counters={result.counters} />
          <button type="button" onClick={resetInput} className="w-full border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">重設示範條件</button>
        </div>

        <div id="discovery-form" className="space-y-10">
          <DiscoveryForm tags={tagsData as Record<DiscoveryField, string[]>} value={input} onChange={setInput} />

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
                <button type="button" onClick={markGenerated} className="mt-5 bg-aurora-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-800">更新摘要計數</button>
              </section>
              <QuestionSetCard questions={result.questions} />
              <StakeholderQuestionCard groups={result.stakeholderQuestions} />
              <FollowUpLogicCard items={result.followUps} />
              <SolutionMappingCard items={result.mappedSolutions} />
              <ExhibitionAdviceCard advice={result.exhibitionAdvice} />
              <DiscoveryBrief markdown={result.briefMarkdown} onCopy={() => markAction("copied")} onExport={() => markAction("exported")} onPrint={() => markAction("printed")} />
            </>
          )}
        </div>
      </div>

      <FooterNotice />
    </div>
  );
}
