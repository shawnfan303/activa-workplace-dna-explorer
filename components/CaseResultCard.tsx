import type { MatchedCase } from "@/lib/caseTypes";
import { MatchScoreBadge } from "./MatchScoreBadge";

type CaseResultCardProps = {
  item: MatchedCase;
  rank: number;
  selected: boolean;
  disabled: boolean;
  onToggle: (caseId: string) => void;
};

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.slice(0, 4).map((item) => (
        <span key={item} className="rounded-full border border-aurora-line bg-white px-2.5 py-1 text-xs leading-none text-aurora-graphite">
          {item}
        </span>
      ))}
    </div>
  );
}

export function CaseResultCard({ item, rank, selected, disabled, onToggle }: CaseResultCardProps) {
  const sourceLabel = item.source_url.includes("aid.aurora.com.tw") ? "大震設計" : "震旦家具";

  return (
    <article className={`overflow-hidden rounded-[10px] border bg-white transition duration-200 ease-out hover:-translate-y-0.5 hover:border-aurora-red hover:shadow-premium ${selected ? "border-aurora-red shadow-premium" : "border-aurora-line shadow-subtle"}`}>
      <div className="grid gap-0 lg:grid-cols-[72px_minmax(0,1fr)_176px_190px]">
        <div className="flex items-start border-b border-aurora-line bg-aurora-soft p-4 lg:border-b-0 lg:border-r">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-red">No.</span>
          <span className="ml-2 text-2xl font-semibold leading-none tabular-nums text-aurora-ink">{rank}</span>
        </div>

        <div className="min-w-0 border-b border-aurora-line p-4 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-aurora-line bg-white px-2.5 py-1 text-xs font-semibold text-aurora-graphite">{sourceLabel}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aurora-red">Public case</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold leading-snug text-aurora-ink">{item.title}</h3>
          {item.score < 40 ? (
            <p className="mt-2 text-sm font-semibold text-red-700">目前公開案例資料匹配度較低，建議改由專人進一步判斷。</p>
          ) : null}
          <p className="mt-3 text-sm leading-7 text-aurora-graphite">{item.recommendationReason}</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-aurora-ink">Industry</p>
              <TagList items={item.industry} />
            </div>
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-aurora-ink">Solution</p>
              <TagList items={item.solution_themes} />
            </div>
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-aurora-ink">Space</p>
              <TagList items={item.space_types} />
            </div>
          </div>
        </div>

        <div className="border-b border-aurora-line p-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold text-aurora-ink">適合使用</p>
          <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.recommended_for.slice(0, 3).join("、")}</p>
          <p className="mt-4 text-xs font-semibold text-aurora-ink">可借鏡重點</p>
          <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.proposal_angle}</p>
        </div>

        <aside className="flex flex-col justify-between gap-4 p-4">
          <MatchScoreBadge score={item.score} />
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              disabled={disabled && !selected}
              className={`px-4 py-2.5 text-sm font-semibold transition duration-200 ease-out ${
                selected ? "rounded-[6px] bg-aurora-red text-white" : "rounded-[6px] border border-aurora-line text-aurora-ink hover:border-aurora-red hover:text-aurora-red"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {selected ? "已加入摘要" : "加入案例摘要"}
            </button>
            <a
              href={item.source_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-[6px] border border-aurora-line px-4 py-2.5 text-center text-sm font-semibold text-aurora-ink transition duration-200 ease-out hover:border-aurora-red hover:text-aurora-red"
            >
              公開來源連結
            </a>
          </div>
        </aside>
      </div>

      <details className="border-t border-aurora-line px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold text-aurora-ink">查看詳細說明</summary>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr_0.7fr]">
          <div>
            <p className="text-xs font-semibold text-aurora-ink">案例摘要</p>
            <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.summary}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-aurora-ink">建議開場</p>
            <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.sales_talking_points[0]}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-aurora-ink">匹配原因</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-aurora-graphite">
              {item.matchedReasons.map((reason) => (
                <li key={reason}>- {reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </article>
  );
}
