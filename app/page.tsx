import Link from "next/link";
import { assetPath } from "@/lib/assets";

const highlights = [
  "以工作型態診斷切入，而不是直接推家具品項",
  "將 ACTIVA 轉化為可討論的辦公場景解決方案"
];

export default function HomePage() {
  return (
    <section className="aurora-container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <img className="mb-8 h-16 w-auto" src={assetPath("/images/aurora-furniture-logo.png")} alt="震旦家具 Aurora Furniture" />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">ACTIVA workplace strategy</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-aurora-ink md:text-6xl">
            用 Workplace DNA 找到更適合企業的辦公場景
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aurora-graphite">
            透過簡短問卷判斷企業目前最需要強化的工作場域能力，並連結 ACTIVA 可支持的專注、協作、混合會議、健康體驗與品牌展示場景。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quiz" className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
              開始診斷
            </Link>
            <Link href="/scenes" className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
              查看場景資料
            </Link>
          </div>
        </div>
        <div className="border border-aurora-line bg-aurora-soft p-6">
          <p className="text-sm font-semibold text-aurora-red">Explorer scope</p>
          <ul className="mt-5 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="border-b border-aurora-line pb-4 text-base leading-7 text-aurora-ink last:border-b-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
