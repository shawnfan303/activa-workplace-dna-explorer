import { downloadMarkdown } from "@/src/lib/exportMarkdown.discovery";
import type { DiscoveryCounters, DiscoveryInput, DiscoveryQuestion, FollowUpLogic, SolutionMapping } from "@/src/types/discovery";

type DiscoveryBriefProps = {
  input: DiscoveryInput;
  counters: DiscoveryCounters;
  questions: DiscoveryQuestion[];
  stakeholderGroups: Array<{ stakeholder: string; opening_angle: string; questions: string[]; tone: string }>;
  followUps: FollowUpLogic[];
  mappedSolutions: SolutionMapping[];
  exhibitionAdvice: string[];
  markdown: string;
  onCopy: () => void;
  onExport: () => void;
  onPrint: () => void;
};

const inputLabels: Array<[keyof DiscoveryInput, string]> = [
  ["industry", "產業"],
  ["project_scenario", "情境"],
  ["stakeholder", "窗口"],
  ["space_needs", "空間"],
  ["pain_points", "痛點"],
  ["solution_themes", "解方"],
  ["work_modes", "模式"]
];

export function DiscoveryBrief({ input, counters, questions, stakeholderGroups, followUps, mappedSolutions, exhibitionAdvice, markdown, onCopy, onExport, onPrint }: DiscoveryBriefProps) {
  async function copyBrief() {
    await navigator.clipboard.writeText(markdown);
    onCopy();
  }

  function exportBrief() {
    downloadMarkdown("aurora-discovery-brief.md", markdown);
    onExport();
  }

  function printBrief() {
    onPrint();
    window.print();
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">Discovery brief</p>
          <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">拜訪摘要</h2>
        </div>
        <div className="screen-only flex flex-wrap gap-2">
          <button type="button" onClick={copyBrief} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">複製摘要</button>
          <button type="button" onClick={exportBrief} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">匯出 Markdown</button>
          <button type="button" onClick={printBrief} className="bg-aurora-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">列印 PDF</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Executive view</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">問診準備完成度</h3>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-6xl font-semibold text-aurora-red">{counters.completion.score}%</p>
              <p className="mt-2 text-sm leading-6 text-aurora-graphite">{counters.completion.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm md:w-[360px]">
              <Metric label="條件" value={counters.selection.total} />
              <Metric label="問診題" value={counters.questions.total} />
              <Metric label="角色" value={counters.stakeholders.selected} />
              <Metric label="追問" value={counters.followUps.questionCount} />
            </div>
          </div>
          <div className="mt-5 h-2 bg-aurora-soft">
            <div className="h-2 bg-aurora-red" style={{ width: `${counters.completion.score}%` }} />
          </div>
        </section>

        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Public data safety</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">{counters.safety.safe ? "安全檢查通過" : "已阻擋敏感內容"}</h3>
          <p className="mt-3 text-sm leading-7 text-aurora-graphite">
            本摘要僅使用非識別化條件與 sample public data，不涉及個資、報價、CRM、未公開專案或內部資料。
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <Metric label="檢查" value={counters.safety.checkedSegments} />
            <Metric label="通過" value={counters.safety.passedSegments} />
            <Metric label="攔截" value={counters.safety.blockedSensitive + counters.safety.blockedPersonal + counters.safety.blockedKeywords} />
          </div>
        </section>
      </div>

      <section className="border border-aurora-line bg-white p-5">
        <p className="text-sm font-semibold text-aurora-red">Requirement map</p>
        <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">需求條件摘要</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {inputLabels.map(([key, label]) => (
            <div key={key} className="bg-aurora-soft p-4">
              <p className="text-xs font-semibold text-aurora-red">{label}</p>
              <p className="mt-2 text-sm leading-6 text-aurora-ink">{input[key].length ? input[key].join("、") : "尚未選擇"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-aurora-line bg-white p-6">
        <p className="text-sm font-semibold text-aurora-red">Discovery axis</p>
        <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">建議問診主軸</h3>
        <p className="mt-4 max-w-5xl text-base leading-8 text-aurora-graphite">
          根據本次條件，本案建議不要直接從家具品項或座位數切入，而應先釐清企業希望透過辦公場域調整達成的管理目標。拜訪時可優先確認不同角色的決策關注、實際使用情境與展廳體驗需求，後續再由震旦家具／大震設計專人依現場條件進一步評估。
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Question set</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">核心問診問題</h3>
          <div className="mt-4 space-y-3">
            {questions.slice(0, 6).map((question, index) => (
              <div key={question.id} className="border-l-2 border-aurora-red bg-aurora-soft p-4">
                <p className="text-sm font-semibold text-aurora-ink">{index + 1}. {question.question}</p>
                <p className="mt-2 text-xs leading-5 text-aurora-graphite">目的：{question.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Stakeholder view</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">角色化訪談重點</h3>
          <div className="mt-4 space-y-3">
            {stakeholderGroups.map((group) => (
              <div key={group.stakeholder} className="bg-aurora-soft p-4">
                <p className="text-sm font-semibold text-aurora-red">{group.stakeholder}</p>
                <p className="mt-2 text-sm leading-6 text-aurora-ink">{group.opening_angle}</p>
                <p className="mt-2 text-xs leading-5 text-aurora-graphite">{group.questions.slice(0, 2).join(" / ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Follow-up logic</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">追問邏輯</h3>
          <div className="mt-4 space-y-3">
            {followUps.slice(0, 3).map((item) => (
              <div key={item.trigger_need} className="bg-aurora-soft p-4">
                <p className="text-sm font-semibold text-aurora-ink">{item.trigger_need}</p>
                <p className="mt-2 text-xs leading-5 text-aurora-graphite">{item.risk}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-aurora-line bg-white p-5">
          <p className="text-sm font-semibold text-aurora-red">Solution direction</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">初步解方與展廳重點</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {mappedSolutions.slice(0, 4).map((item) => (
              <div key={item.pain_point} className="bg-aurora-soft p-4">
                <p className="text-sm font-semibold text-aurora-ink">{item.pain_point}</p>
                <p className="mt-2 text-xs font-semibold text-aurora-red">{item.mapped_solution.join(" / ")}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-aurora-line pt-4">
            {exhibitionAdvice.slice(0, 3).map((item) => <p key={item} className="mt-2 text-sm leading-6 text-aurora-graphite">- {item}</p>)}
          </div>
        </section>
      </div>

      <details className="screen-only border border-aurora-line bg-white p-5">
        <summary className="cursor-pointer text-sm font-semibold text-aurora-ink">查看 Markdown 原文</summary>
        <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap bg-aurora-soft p-5 text-sm leading-7 text-aurora-ink">{markdown}</pre>
      </details>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-aurora-soft p-3">
      <p className="text-xs text-aurora-graphite">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-aurora-ink">{value}</p>
    </div>
  );
}
