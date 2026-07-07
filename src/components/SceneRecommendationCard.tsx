import type { SceneRecommendation } from "@/src/types/recommender";
import { DataReviewBadge } from "./DataReviewBadge";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SourceLink } from "./SourceLink";

type SceneRecommendationCardProps = {
  item: SceneRecommendation;
};

export function SceneRecommendationCard({ item }: SceneRecommendationCardProps) {
  return (
    <article className="break-inside-avoid border border-aurora-line bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">推薦辦公場景</p>
          <h3 className="mt-1 text-2xl font-semibold text-aurora-ink">{item.name}</h3>
          <div className="mt-3"><DataReviewBadge status={item.review_status} /></div>
        </div>
        <MatchScoreBadge score={item.match_score} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-aurora-red">適合用途</p>
          <p className="mt-1 text-sm leading-6 text-aurora-graphite">{item.description}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-aurora-red">建議產品分類</p>
          <p className="mt-1 text-sm leading-6 text-aurora-graphite">{item.recommended_products.join("、")}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-aurora-red">對應工作模式</p>
          <p className="mt-1 text-sm leading-6 text-aurora-graphite">{item.suitable_work_modes.join("、")}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-aurora-red">對應痛點</p>
          <p className="mt-1 text-sm leading-6 text-aurora-graphite">{item.pain_points.join("、")}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-aurora-graphite">{item.scene_strategy}</p>
      <div className="mt-5"><SourceLink href={item.source_url} /></div>
    </article>
  );
}

