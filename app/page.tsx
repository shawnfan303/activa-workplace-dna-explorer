import Link from "next/link";
import { UsageCounter } from "@/components/UsageCounter";
import { assetPath } from "@/lib/assets";

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-1px)] border-b border-aurora-line bg-[#f7f7f8] px-5 py-4">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-6">
          <img className="h-12 w-auto" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
          <p className="text-lg font-semibold tracking-[0.18em] text-aurora-red md:text-xl">Workplace DNA Explorer</p>
        </div>

        <div className="mt-12">
          <div>
            <h1 className="max-w-none text-[44px] font-semibold leading-[0.98] tracking-normal text-aurora-ink md:whitespace-nowrap md:text-[64px] xl:text-[78px]">
              ACTIVA Workplace DNA Explorer
            </h1>
            <p className="mt-8 max-w-none text-lg leading-9 text-aurora-graphite md:whitespace-nowrap xl:text-xl">
              透過簡短問卷判斷企業目前最需要強化的工作場域能力，並推薦最適合的 ACTIVA 辦公場景卡，協助營業同仁快速建立客戶溝通方向。
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/quiz" className="inline-flex h-[52px] items-center justify-center bg-aurora-red px-7 text-base font-semibold text-white shadow-subtle transition hover:bg-red-800">
                開始診斷
              </Link>
              <Link href="/customer-toolbox" className="inline-flex h-[52px] items-center justify-center border border-aurora-line bg-white px-7 text-base font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
                顧客經營工具箱
              </Link>
              <UsageCounter variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
