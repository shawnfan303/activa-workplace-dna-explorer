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
  return (
    <article className="break-inside-avoid border border-aurora-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-red">公開案例</p>
          <h3 className="mt-2 text-2xl font-semibold text-aurora-ink">{item.title}</h3>
          {item.score < 40 ? (
            <p className="mt-2 text-sm font-semibold text-red-700">目前公開案例資料匹配度較低，建議改由專人進一步判斷。</p>
          ) : null}
        </div>
        <MatchScoreBadge score={item.score} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-semibold text-aurora-ink">產業標籤</p>
          <TagList items={item.industry} />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-aurora-ink">解決方案</p>
          <TagList items={item.solution_themes} />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-aurora-ink">空間標籤</p>
          <TagList items={item.space_types} />
        </div>
      </div>

      <div className="mt-5 space-y-4 text-sm leading-7 text-aurora-graphite">
        <p>
          <span className="font-semibold text-aurora-ink">推薦原因：</span>
          {item.recommendationReason}
        </p>
        <p>
          <span className="font-semibold text-aurora-ink">可借鏡重點：</span>
          {item.proposal_angle}
        </p>
        <p>
          <span className="font-semibold text-aurora-ink">適合拜訪情境：</span>
          {item.recommended_for.join("、")}
        </p>
        <p>
          <span className="font-semibold text-aurora-ink">建議營業開場：</span>
          {item.sales_talking_points[0]}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
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
