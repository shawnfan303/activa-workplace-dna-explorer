import type { ReviewStatus } from "@/src/types/recommender";

type DataReviewBadgeProps = {
  status: ReviewStatus;
};

export function DataReviewBadge({ status }: DataReviewBadgeProps) {
  const labelMap: Record<ReviewStatus, string> = {
    approved_public: "已人工覆核公開資料",
    sample_pending_review: "SAMPLE_PUBLIC_DATA_PENDING_REVIEW",
    pending_review: "待人工覆核",
    blocked: "已阻擋"
  };
  const tone = status === "approved_public" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : status === "blocked" ? "border-red-200 bg-red-50 text-red-800" : "border-amber-200 bg-amber-50 text-amber-800";
  return <span className={`inline-flex border px-2 py-1 text-xs font-semibold ${tone}`}>{labelMap[status]}</span>;
}

