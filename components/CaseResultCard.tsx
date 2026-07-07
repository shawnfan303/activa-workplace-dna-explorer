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
    <div className="flex flex-wrap gap-1.5">
      {items.slice(0, 4).map((item) => (
        <span key={item} className="border border-aurora-line bg-white px-2.5 py-1 text-xs leading-none text-aurora-graphite">
          {item}
        </span>
      ))}
    </div>
  );
}

export function CaseResultCard({ item, selected, disabled, onToggle }: CaseResultCardProps) {
  const sourceLabel = item.source_url.includes("aid.aurora.com.tw") ? "大震設計" : "震旦家具";

  return (
    <article className={`break-inside-avoid border bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-subtle ${selected ? "border-aurora-red" : "border-aurora-line"}`}>
      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_190px]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="uppercase tracking-[0.16em] text-aurora-red">公開案例</span>
            <span className="border border-aurora-line bg-aurora-soft px-2.5 py-1 text-aurora-graphite">{sourceLabel}</span>
          </div>
          <h3 className="text-2xl font-semibold leading-snug text-aurora-ink">{item.title}</h3>
          {item.score < 40 ? (
            <p className="text-sm font-semibold text-red-700">目前公開案例資料匹配度較低，建議改由專人進一步判斷。</p>
          ) : null}
          <p className="text-sm leading-7 text-aurora-graphite">{item.recommendationReason}</p>

          <div className="grid gap-3 border-y border-aurora-line py-4 md:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-semibold text-aurora-ink">產業</p>
              <TagList items={item.industry} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-aurora-ink">解決方案</p>
              <TagList items={item.solution_themes} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-aurora-ink">空間</p>
              <TagList items={item.space_types} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-aurora-ink">可借鏡重點</p>
              <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.proposal_angle}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-aurora-ink">建議開場</p>
              <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.sales_talking_points[0]}</p>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4 border-t border-aurora-line pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <MatchScoreBadge score={item.score} />
          <div>
            <p className="text-xs font-semibold text-aurora-ink">拜訪情境</p>
            <p className="mt-2 text-sm leading-7 text-aurora-graphite">{item.recommended_for.join("、")}</p>
          </div>
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              disabled={disabled && !selected}
              className={`px-4 py-2.5 text-sm font-semibold transition duration-200 ease-out ${
                selected ? "bg-aurora-red text-white" : "border border-aurora-line text-aurora-ink hover:border-aurora-red hover:text-aurora-red"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {selected ? "已加入摘要" : "加入案例摘要"}
            </button>
            <a
              href={item.source_url}
              target="_blank"
              rel="noreferrer"
              className="border border-aurora-line px-4 py-2.5 text-center text-sm font-semibold text-aurora-ink transition duration-200 ease-out hover:border-aurora-red hover:text-aurora-red"
            >
              公開來源連結
            </a>
          </div>
        </aside>
      </div>

      <details className="border-t border-aurora-line px-5 py-4">
        <summary className="cursor-pointer text-sm font-semibold text-aurora-ink">查看詳細說明</summary>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.7fr]">
          <p className="mt-3 text-sm leading-7 text-aurora-graphite">{item.summary}</p>
          <ul className="mt-3 space-y-1 text-sm text-aurora-graphite">
            {item.matchedReasons.map((reason) => (
              <li key={reason}>- {reason}</li>
            ))}
          </ul>
        </div>
      </details>
    </article>
  );
}
