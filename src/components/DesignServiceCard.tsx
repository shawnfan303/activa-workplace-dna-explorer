import type { DesignServiceRecommendation } from "@/src/types/recommender";
import { DataReviewBadge } from "./DataReviewBadge";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SourceLink } from "./SourceLink";

type DesignServiceCardProps = {
  item: DesignServiceRecommendation;
};

export function DesignServiceCard({ item }: DesignServiceCardProps) {
  return (
    <article className="break-inside-avoid border border-aurora-line bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">大震設計服務建議</p>
          <h3 className="mt-1 text-xl font-semibold text-aurora-ink">{item.name}</h3>
          <div className="mt-3"><DataReviewBadge status={item.review_status} /></div>
        </div>
        <MatchScoreBadge score={item.match_score} />
      </div>
      <div className="mt-4 space-y-3 text-sm leading-6 text-aurora-graphite">
        <p><span className="font-semibold text-aurora-ink">適合情境：</span>{item.suitable_scenarios.join("、")}</p>
        <p><span className="font-semibold text-aurora-ink">推薦原因：</span>{item.recommendation_reason}</p>
        <p><span className="font-semibold text-aurora-ink">可搭配方向：</span>{(item.related_products ?? []).join("、") || "可由專人進一步評估"}</p>
      </div>
      <div className="mt-5"><SourceLink href={item.source_url} /></div>
    </article>
  );
}

