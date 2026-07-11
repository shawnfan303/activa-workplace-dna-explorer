export function FooterNotice() {
  return (
    <footer className="border-t border-aurora-line bg-aurora-soft">
      <div className="aurora-container py-8 text-sm leading-7 text-aurora-graphite">
        <p className="font-semibold text-aurora-ink">公開資料聲明與免責聲明</p>
        <p className="mt-2">本工具僅使用震旦家具與大震設計官網公開資料，以及使用者所選擇的非識別化條件。不涉及客戶個資、內部報價、成交資訊、設計圖、合約內容、CRM資料或未公開專案資料。</p>
        <p className="mt-2">目前資料審核狀態：SAMPLE_PUBLIC_DATA_PENDING_REVIEW。正式上線前，需由人工以公開資料替換 sample data，並將 review_status 改為 approved_public 後才可顯示於正式介面。</p>
        <p className="mt-5 border-t border-aurora-line pt-5 font-semibold text-aurora-ink">© 2026 Shawn Fan. Concept, Product Design &amp; Development.</p>
      </div>
    </footer>
  );
}
