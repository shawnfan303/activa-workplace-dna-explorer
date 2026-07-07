type PublicDataNoticeProps = {
  lastCrawled?: string;
};

export function PublicDataNotice({ lastCrawled }: PublicDataNoticeProps) {
  return (
    <section id="public-data-notice" className="border border-aurora-line bg-white p-5 text-sm leading-7 text-aurora-graphite">
      <p className="font-semibold text-aurora-ink">公開資料與安全聲明</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="border border-aurora-line bg-aurora-soft p-3">資料來源：震旦家具官網、大震設計官網</div>
        <div className="border border-aurora-line bg-aurora-soft p-3">僅使用公開資料，不涉及個資與內部資料</div>
        <div className="border border-aurora-line bg-aurora-soft p-3">推薦結果僅供初步討論，不代表正式規劃或承諾</div>
      </div>
      <p className="mt-3">
        本工具不要求姓名、電話、Email、公司名稱、地址、預算或專案金額；也不顯示價格、折扣、交期、庫存、成交資訊或未經驗證的效益數據。
      </p>
      {lastCrawled ? <p className="mt-2 text-xs">資料最後更新日期：{lastCrawled}</p> : null}
    </section>
  );
}

