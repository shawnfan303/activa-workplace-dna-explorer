import type { DiscoveryCounters } from "@/src/types/discovery";

export function SafeDataCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className={`border p-4 ${counters.safety.safe ? "border-aurora-line bg-white" : "border-aurora-red bg-red-50"}`}>
      <p className="font-semibold text-aurora-ink">公開資料安全檢查計數器</p>
      {!counters.safety.safe ? (
        <p className="mt-2 text-sm leading-6 text-aurora-red">偵測到可能不適合公開系統使用的內容，已阻擋輸出。請移除個資、報價、公司內部資訊或未公開專案資料。</p>
      ) : (
        <p className="mt-2 text-sm text-aurora-graphite">目前選項通過本機安全檢查。</p>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <Metric label="已檢查" value={counters.safety.checkedSegments} />
        <Metric label="通過" value={counters.safety.passedSegments} />
        <Metric label="敏感攔截" value={counters.safety.blockedSensitive} />
        <Metric label="個資攔截" value={counters.safety.blockedPersonal} />
        <Metric label="禁用詞" value={counters.safety.blockedKeywords} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/70 p-2">
      <p className="text-xs text-aurora-graphite">{label}</p>
      <p className="font-semibold text-aurora-ink">{value}</p>
    </div>
  );
}
