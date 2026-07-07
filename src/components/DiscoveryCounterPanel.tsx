import { CompletionCounter } from "@/src/components/CompletionCounter";
import { ProgressCounter } from "@/src/components/ProgressCounter";
import { QuestionCounter } from "@/src/components/QuestionCounter";
import { SafeDataCounter } from "@/src/components/SafeDataCounter";
import { SolutionCounter } from "@/src/components/SolutionCounter";
import { StakeholderCounter } from "@/src/components/StakeholderCounter";
import type { DiscoveryCounters } from "@/src/types/discovery";

export function DiscoveryCounterPanel({ counters }: { counters: DiscoveryCounters }) {
  return (
    <aside className="space-y-4">
      <div className="border border-aurora-line bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aurora-red">Local counter</p>
        <p className="mt-2 text-4xl font-semibold text-aurora-ink">{counters.localDisplayCount.toLocaleString("zh-TW")}</p>
        <p className="mt-2 text-xs leading-6 text-aurora-graphite">起始值 5889。僅使用本機 localStorage，不記錄個別使用者或跨裝置追蹤。</p>
      </div>
      <CompletionCounter counters={counters} />
      <ProgressCounter counters={counters} />
      <QuestionCounter counters={counters} />
      <StakeholderCounter counters={counters} />
      <SolutionCounter counters={counters} />
      <SafeDataCounter counters={counters} />
      <div className="grid grid-cols-2 gap-2 border border-aurora-line bg-white p-4 text-sm">
        <Metric label="摘要" value={counters.brief.generated} />
        <Metric label="複製" value={counters.brief.copied} />
        <Metric label="匯出" value={counters.brief.exported} />
        <Metric label="列印" value={counters.brief.printed} />
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-aurora-soft p-3">
      <p className="text-xs text-aurora-graphite">{label}</p>
      <p className="mt-1 text-xl font-semibold text-aurora-ink">{value}</p>
    </div>
  );
}
