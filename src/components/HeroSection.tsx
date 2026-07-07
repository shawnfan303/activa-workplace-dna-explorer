type HeroSectionProps = {
  onStart: () => void;
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="border-b border-aurora-line bg-aurora-soft">
      <div className="aurora-container py-14 md:py-18">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Public product and scene recommender</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight text-aurora-ink md:text-6xl">AURORA Product & Scene Recommender</h1>
        <p className="mt-3 text-2xl font-semibold text-aurora-ink">震旦家具產品風格／場景推薦器</p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-aurora-graphite">依據公開資料，快速找到適合企業辦公需求的產品分類、場景方向與設計服務建議。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={onStart} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
            開始推薦
          </button>
          <a href="#public-data-notice" className="border border-aurora-line bg-white px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
            查看公開資料邊界
          </a>
        </div>
      </div>
    </section>
  );
}
