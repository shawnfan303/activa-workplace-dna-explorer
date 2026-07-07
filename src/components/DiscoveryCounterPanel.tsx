import { CompletionCounter } from "@/src/components/CompletionCounter";
import { ProgressCounter } from "@/src/components/ProgressCounter";
import { QuestionCounter } from "@/src/components/QuestionCounter";
import { SafeDataCounter } from "@/src/components/SafeDataCounter";
import { SolutionCounter } from "@/src/components/SolutionCounter";
import { StakeholderCounter } from "@/src/components/StakeholderCounter";
import type { DiscoveryCounters } from "@/src/types/discovery";

export function DiscoveryCounterPanel({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <div className="flex flex-col gap-1 border-b border-aurora-line pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aurora-red">Discovery dashboard</p>
          <h2 className="mt-1 text-2xl font-semibold text-aurora-ink">問診準備計數器</h2>
        </div>
        <p className="text-xs leading-5 text-aurora-graphite">僅使用本機 session / localStorage，不做跨使用者追蹤。</p>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <CompletionCounter counters={counters} />
        <ProgressCounter counters={counters} />
        <QuestionCounter counters={counters} />
        <StakeholderCounter counters={counters} />
        <SolutionCounter counters={counters} />
        <SafeDataCounter counters={counters} />
        <div className="grid grid-cols-2 gap-2 border border-aurora-line bg-white p-4 text-sm xl:col-span-2 md:grid-cols-4">
          <Metric label="摘要" value={counters.brief.generated} />
          <Metric label="複製" value={counters.brief.copied} />
          <Metric label="匯出" value={counters.brief.exported} />
          <Metric label="列印" value={counters.brief.printed} />
        </div>
      </div>
    </section>
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
