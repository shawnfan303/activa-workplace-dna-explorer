import { publicDataDisclaimer } from "@/lib/briefGenerator";

type PublicDataNoticeProps = {
  lastReviewed?: string;
};

export function PublicDataNotice({ lastReviewed }: PublicDataNoticeProps) {
  return (
    <section className="border border-aurora-line bg-white p-5 text-sm leading-7 text-aurora-graphite">
      <p className="font-semibold text-aurora-ink">公開資料與安全邊界</p>
      <p className="mt-2">{publicDataDisclaimer}</p>
      {lastReviewed ? <p className="mt-2 text-xs text-aurora-graphite">最後資料檢視日期：{lastReviewed}</p> : null}
    </section>
  );
}
