import Link from "next/link";
import { UsageCounter } from "@/components/UsageCounter";

export default function HomePage() {
  return (
    <>
      <section className="min-h-[calc(100vh-1px)] border-b border-aurora-line bg-aurora-soft px-5 py-8 md:py-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-[14px] border border-aurora-line bg-white px-6 py-10 shadow-subtle md:px-8 md:py-14">
            <div>
              <h1 className="max-w-none text-[42px] font-semibold leading-[1] tracking-normal text-aurora-ink md:whitespace-nowrap md:text-[62px] xl:text-[76px]">
                ACTIVA Workplace DNA Explorer
              </h1>
              <p className="mt-7 max-w-none text-lg leading-9 text-aurora-graphite md:whitespace-nowrap xl:text-xl">
                透過簡短問卷判斷企業目前最需要強化的工作場域能力，並推薦最適合的 ACTIVA 辦公場景卡，協助營業同仁快速建立客戶溝通方向。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/quiz" className="inline-flex h-11 items-center justify-center rounded-[6px] bg-aurora-red px-6 text-sm font-semibold text-white shadow-subtle transition duration-200 hover:bg-red-800">
                  開始診斷
                </Link>
                <Link href="/customer-toolbox" className="inline-flex h-11 items-center justify-center rounded-[6px] border border-aurora-line bg-white px-6 text-sm font-semibold text-aurora-ink transition duration-200 hover:border-aurora-red hover:text-aurora-red">
                  顧客經營工具箱
                </Link>
                <UsageCounter variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-aurora-line bg-white">
        <div className="aurora-container py-10 text-center text-sm font-semibold text-aurora-graphite md:py-12">
          © 2026 Shawn Fan. Concept, Product Design &amp; Development.
        </div>
      </footer>
    </>
  );
}
