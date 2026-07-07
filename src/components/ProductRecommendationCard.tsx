import type { ProductRecommendation } from "@/src/types/recommender";
import { DataReviewBadge } from "./DataReviewBadge";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SourceLink } from "./SourceLink";

type ProductRecommendationCardProps = {
  item: ProductRecommendation;
  selected: boolean;
  onToggle: (id: string) => void;
};

function Tags({ items }: { items: string[] }) {
  return <p className="text-sm leading-6 text-aurora-graphite">{items.join("、") || "需進一步評估"}</p>;
}

export function ProductRecommendationCard({ item, selected, onToggle }: ProductRecommendationCardProps) {
  return (
    <article className="break-inside-avoid border border-aurora-line bg-white p-5 shadow-subtle">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">{item.parent_category}</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">{item.name}</h3>
          <div className="mt-3"><DataReviewBadge status={item.review_status} /></div>
        </div>
        <MatchScoreBadge score={item.match_score} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div><p className="text-xs font-semibold text-aurora-red">適合空間</p><Tags items={item.suitable_spaces} /></div>
        <div><p className="text-xs font-semibold text-aurora-red">適合工作模式</p><Tags items={item.suitable_work_modes} /></div>
        <div><p className="text-xs font-semibold text-aurora-red">適合使用者</p><Tags items={item.suitable_users} /></div>
        <div><p className="text-xs font-semibold text-aurora-red">對應解決方案</p><Tags items={item.solution_themes} /></div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold text-aurora-red">風格標籤</p>
        <Tags items={item.style_tags} />
      </div>
      <p className="mt-4 text-sm leading-7 text-aurora-graphite">{item.recommendation_reason}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <SourceLink href={item.source_url} />
        <button type="button" onClick={() => onToggle(item.id)} className={`px-4 py-2 text-sm font-semibold transition ${selected ? "bg-aurora-ink text-white" : "bg-aurora-red text-white hover:bg-red-800"}`}>
          {selected ? "已加入摘要" : "加入推薦摘要"}
        </button>
      </div>
    </article>
  );
}

