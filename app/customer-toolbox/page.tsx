import type { Metadata } from "next";
import Link from "next/link";
import { UsageCounter } from "@/components/UsageCounter";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "顧客經營工具箱",
  description: "整合行銷工具與案件資源，協助營業快速找資料、做提案、推進商機。"
};

const salesFlow = [
  {
    step: "01",
    phase: "拜訪前需求釐清",
    question: "我還不確定客戶真正需求，該先問什麼？",
    outcome: "建立拜訪前摘要、追問方向與展廳導覽切入點。",
    tool: "Discovery Assistant",
    toolType: "已可使用",
    href: "/discovery-assistant",
    cta: "進入工具"
  },
  {
    step: "02",
    phase: "工作模式診斷",
    question: "我已掌握初步需求，要如何轉成辦公場景？",
    outcome: "將需求轉譯為 Workplace DNA 與 ACTIVA 場景推薦。",
    tool: "Workplace DNA",
    toolType: "已可使用",
    href: "/",
    cta: "進入首頁"
  },
  {
    step: "03",
    phase: "公開案例佐證",
    question: "我需要案例讓客戶更快理解提案方向。",
    outcome: "找到可借鏡的公開案例、案例語言與提案素材。",
    tool: "Case Match Engine",
    toolType: "已可使用",
    href: "/case-match",
    cta: "進入工具"
  },
  {
    step: "04",
    phase: "提案素材組裝",
    question: "我需要把前面結果整理成客戶可讀的簡報或說帖。",
    outcome: "串接方案、案例、產品與服務路徑，形成可提案內容。",
    tool: "Proposal Builder",
    toolType: "製作中",
    href: "",
    cta: "製作中"
  },
  {
    step: "05",
    phase: "ESG／永續溝通",
    question: "客戶關心 ESG、循環經濟或採購佐證時如何回應？",
    outcome: "整理永續資料、證據需求與採購溝通語言。",
    tool: "ESG Evidence Kit",
    toolType: "製作中",
    href: "",
    cta: "製作中"
  },
  {
    step: "06",
    phase: "產業情報追蹤",
    question: "我需要掌握競品、趨勢與產業訊號。",
    outcome: "建立市場訊號、競品動態與管理層可讀情報。",
    tool: "Intelligence Brief",
    toolType: "製作中",
    href: "",
    cta: "製作中"
  }
];

const activeTools = salesFlow.filter((item) => item.toolType === "已可使用");
const inProgressTools = salesFlow.filter((item) => item.toolType === "製作中");

export default function CustomerToolboxPage() {
  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#182123]">
      <main>
        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-center gap-5 border-b border-[#d9d5ca] pb-6">
            <img className="h-16 w-auto md:h-20" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b80f2c] md:text-base">Sales development toolbox</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-start">
          <div>
            <h1 className="whitespace-nowrap text-[clamp(2.7rem,6.6vw,5.8rem)] font-semibold leading-[0.95] text-[#111718]">
              顧客經營工具箱
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#4b5b5f]">
              整合行銷工具與案件資源，協助營業快速找資料、做提案、推進商機。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#flow" className="inline-flex h-12 items-center bg-[#b80f2c] px-6 text-sm font-semibold text-white transition hover:bg-[#930b23]">
                查看營業流程
              </a>
              <a href="#tools" className="inline-flex h-12 items-center border border-[#c9c5ba] bg-white px-6 text-sm font-semibold transition hover:border-[#b80f2c] hover:text-[#b80f2c]">
                查看三個工具
              </a>
              <UsageCounter variant="compact" />
            </div>
          </div>

          <div className="bg-[#182529] p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Current coverage</p>
            <div className="mt-8 grid gap-4">
              {activeTools.map((item) => (
                <div key={item.tool} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border border-white/15 bg-white/5 p-4">
                  <div className="flex h-16 items-center justify-center border border-white/20 text-sm font-semibold text-[#f3b6c1]">{item.step}</div>
                  <div>
                    <p className="text-lg font-semibold">{item.tool}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.phase}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-white/20 pt-5 text-sm leading-7 text-white/60">
              未來工具將沿著同一條流程補齊，而不是新增成分散的連結。
            </div>
          </div>
          </div>
        </section>

        <section id="flow" className="border-y border-[#d9d5ca] bg-[#ebe8df]">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b80f2c]">Sales Flow</p>
                <h2 className="mt-3 text-4xl font-semibold">營業案件前期經營流程</h2>
              </div>
            </div>

            <div className="grid gap-4">
              {salesFlow.map((item) => (
                <article key={item.step} className="grid gap-4 bg-white p-5 shadow-subtle lg:grid-cols-[120px_minmax(0,1fr)_260px_150px] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] text-[#b80f2c]">STEP {item.step}</p>
                    <p className="mt-2 text-sm font-semibold text-[#6a777a]">{item.phase}</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{item.question}</p>
                    <p className="mt-2 text-sm leading-6 text-[#4b5b5f]">{item.outcome}</p>
                  </div>
                  <div>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold ${item.toolType === "已可使用" ? "bg-[#b80f2c] text-white" : "border border-[#c9c5ba] text-[#6a777a]"}`}>
                      {item.toolType}
                    </span>
                    <p className="mt-3 text-lg font-semibold">{item.tool}</p>
                  </div>
                  {item.href ? (
                    <Link href={item.href} className="inline-flex h-12 items-center justify-center bg-[#182529] px-5 text-sm font-semibold text-white transition hover:bg-[#2b383b]">
                      {item.cta}
                    </Link>
                  ) : (
                    <span className="inline-flex h-12 items-center justify-center border border-dashed border-[#c9c5ba] px-5 text-sm font-semibold text-[#6a777a]">
                      {item.cta}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b80f2c]">Available Now</p>
              <h2 className="mt-3 text-4xl font-semibold">目前可使用工具</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#4b5b5f]">
              三個工具對應案件前期的前三個關鍵步驟：釐清需求、轉譯場景、找到案例。
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {activeTools.map((item) => (
              <Link key={item.tool} href={item.href} className="group flex min-h-[330px] flex-col justify-between bg-white p-6 shadow-subtle transition hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#b80f2c]">STEP {item.step}</span>
                    <span className="border border-[#d8d5cc] px-3 py-1 text-xs font-semibold text-[#4b5b5f]">{item.toolType}</span>
                  </div>
                  <h3 className="mt-7 text-3xl font-semibold">{item.tool}</h3>
                  <p className="mt-4 text-base leading-7 text-[#4b5b5f]">{item.outcome}</p>
                </div>
                <p className="mt-8 text-sm font-semibold text-[#182529] transition group-hover:text-[#b80f2c]">{item.cta}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="roadmap" className="bg-[#182529] text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f3b6c1]">Roadmap</p>
                <h2 className="mt-3 text-4xl font-semibold">預計增設工具</h2>
              </div>
              <div className="grid gap-4">
                {inProgressTools.map((item) => (
                  <div key={item.tool} className="grid gap-4 border border-white/15 p-5 md:grid-cols-[120px_minmax(0,1fr)_120px] md:items-center">
                    <p className="text-sm font-semibold tracking-[0.2em] text-[#f3b6c1]">STEP {item.step}</p>
                    <div>
                      <p className="text-xl font-semibold">{item.tool}</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">{item.phase}｜{item.outcome}</p>
                    </div>
                    <span className="inline-flex h-10 items-center justify-center border border-white/20 text-sm font-semibold text-white/60">製作中</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-[#d9d5ca] bg-[#111718] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-semibold text-white">SHAWN FAN</p>
          <p>顧客經營工具箱 / Version 2026 Q3</p>
        </div>
      </footer>
    </div>
  );
}
