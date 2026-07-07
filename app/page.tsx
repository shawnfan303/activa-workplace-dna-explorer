import Link from "next/link";
import { UsageCounter } from "@/components/UsageCounter";
import { assetPath } from "@/lib/assets";

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-1px)] border-b border-aurora-line bg-[#f7f7f8] px-5 py-4">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-6">
          <img className="h-9 w-auto" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
          <p className="text-base font-semibold uppercase tracking-[0.28em] text-aurora-red md:text-lg">Workplace DNA Explorer</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-aurora-ink md:text-7xl">
              ACTIVA Workplace DNA Explorer
            </h1>
            <p className="mt-8 max-w-5xl text-xl leading-9 text-aurora-graphite">
              透過簡短問卷判斷企業目前最需要強化的工作場域能力，並推薦最適合的 ACTIVA 辦公場景卡，協助營業同仁快速建立客戶溝通方向。
            </p>
            <div className="mt-12">
              <Link href="/quiz" className="inline-flex bg-aurora-red px-7 py-4 text-base font-semibold text-white shadow-subtle transition hover:bg-red-800">
                開始診斷
              </Link>
            </div>
          </div>

          <div className="lg:pt-24">
            <UsageCounter variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
