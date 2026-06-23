import type { MatchedCase } from "@/lib/caseTypes";
import { MatchScoreBadge } from "./MatchScoreBadge";

type CaseResultCardProps = {
  item: MatchedCase;
  selected: boolean;
  disabled: boolean;
  onToggle: (caseId: string) => void;
};

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="border border-aurora-line bg-white px-2.5 py-1 text-xs text-aurora-graphite">
          {item}
        </span>
      ))}
    </div>
  );
}

export function CaseResultCard({ item, selected, disabled, onToggle }: CaseResultCardProps) {
  const sourceLabel = item.source_url.includes("aid.aurora.com.tw") ? "大震設計" : "震旦家具";

  return (
    <article className="break-inside-avoid overflow-hidden border border-aurora-line bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1fr_180px]">
        <div className="border-b border-aurora-line bg-slate-50 p-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-red">公開案例</p>
            <span className="bg-white px-2.5 py-1 text-xs font-semibold text-aurora-graphite">{sourceLabel}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-snug text-aurora-ink">{item.title}</h3>
          {item.score < 40 ? (
            <p className="mt-2 text-sm font-semibold text-red-700">目前公開案例資料匹配度較低，建議改由專人進一步判斷。</p>
          ) : null}
          <p className="mt-4 text-sm leading-7 text-aurora-graphite">{item.recommendationReason}</p>
        </div>
        <div className="flex flex-col justify-between bg-emerald-50 p-5">
          <MatchScoreBadge score={item.score} />
          <div className="mt-4">
            <div className="h-2 bg-white">
              <div className="h-2 bg-emerald-600" style={{ width: `${item.score}%` }} />
            </div>
            <p className="mt-2 text-xs leading-5 text-emerald-800">此分數只代表公開案例與目前條件的相近程度。</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-t border-aurora-line md:grid-cols-3">
        <div className="border-b border-aurora-line p-4 md:border-b-0 md:border-r">
          <p className="mb-2 text-xs font-semibold text-aurora-ink">產業標籤</p>
          <TagList items={item.industry} />
        </div>
        <div className="border-b border-aurora-line p-4 md:border-b-0 md:border-r">
          <p className="mb-2 text-xs font-semibold text-aurora-ink">解決方案</p>
          <TagList items={item.solution_themes} />
        </div>
        <div className="p-4">
          <p className="mb-2 text-xs font-semibold text-aurora-ink">空間標籤</p>
          <TagList items={item.space_types} />
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-3">
        <div className="border-l-4 border-slate-300 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-aurora-ink">可借鏡重點</p>
          <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.proposal_angle}</p>
        </div>
        <div className="border-l-4 border-red-200 bg-red-50 p-4">
          <p className="text-xs font-semibold text-aurora-ink">拜訪情境</p>
          <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.recommended_for.join("、")}</p>
        </div>
        <div className="border-l-4 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold text-aurora-ink">建議開場</p>
          <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.sales_talking_points[0]}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-aurora-line p-5">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          disabled={disabled && !selected}
          className={`px-4 py-2 text-sm font-semibold transition ${
            selected ? "bg-aurora-red text-white" : "border border-aurora-line text-aurora-ink hover:border-aurora-red hover:text-aurora-red"
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {selected ? "已加入摘要" : "加入案例摘要"}
        </button>
        <a
          href={item.source_url}
          target="_blank"
          rel="noreferrer"
          className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red"
        >
          公開來源連結
        </a>
        <details className="w-full border-t border-aurora-line pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-aurora-ink">查看詳細說明</summary>
          <p className="mt-3 text-sm leading-7 text-aurora-graphite">{item.summary}</p>
          <ul className="mt-3 space-y-1 text-sm text-aurora-graphite">
            {item.matchedReasons.map((reason) => (
              <li key={reason}>- {reason}</li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}
