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

const tokens = {
  page: "bg-[#f7f7f5] text-[#15191d]",
  container: "mx-auto max-w-7xl px-5 lg:px-8",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.18em] text-[#b80f2c]",
  muted: "text-[#5f6b72]",
  border: "border-[#dedbd3]",
  surface: "border border-[#e3e0d8] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
  primaryButton: "inline-flex h-11 items-center justify-center rounded-[6px] bg-[#b80f2c] px-5 text-sm font-semibold text-white transition duration-200 ease-out hover:bg-[#9f0c25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b80f2c]",
  secondaryButton: "inline-flex h-11 items-center justify-center rounded-[6px] border border-[#d8d5cc] bg-white px-5 text-sm font-semibold text-[#20272c] transition duration-200 ease-out hover:border-[#b80f2c] hover:text-[#b80f2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b80f2c]"
};

export default function CustomerToolboxPage() {
  return (
    <div className={`min-h-screen ${tokens.page}`}>
      <main>
        <section className={`${tokens.container} py-10 lg:py-18`}>
          <div className={`mb-10 flex items-center gap-4 border-b ${tokens.border} pb-5`}>
            <img className="h-14 w-auto md:h-16" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
            <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em] text-[#b80f2c]">Sales development toolbox</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
            <div>
              <h1 className="whitespace-nowrap text-[clamp(2.5rem,6vw,5.35rem)] font-semibold leading-[0.98] tracking-normal text-[#101417]">
                顧客經營工具箱
              </h1>
              <p className={`mt-5 max-w-3xl text-lg leading-8 md:text-xl ${tokens.muted}`}>
                整合行銷工具與案件資源，協助營業快速找資料、做提案、推進商機。
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#flow" className={tokens.primaryButton}>
                  查看營業流程
                </a>
                <a href="#tools" className={tokens.secondaryButton}>
                  查看三個工具
                </a>
                <UsageCounter variant="compact" />
              </div>
            </div>

            <div className="rounded-[10px] border border-[#252d31] bg-[#121719] p-6 text-white shadow-[0_18px_40px_rgba(17,23,24,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Current coverage</p>
              <div className="mt-6 grid gap-3">
                {activeTools.map((item) => (
                  <div key={item.tool} className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 rounded-[8px] border border-white/10 bg-white/[0.045] p-3.5 transition duration-200 hover:bg-white/[0.07]">
                    <div className="flex h-14 items-center justify-center rounded-[6px] border border-white/15 text-sm font-semibold text-[#f0b4bf]">{item.step}</div>
                    <div>
                      <p className="text-base font-semibold">{item.tool}</p>
                      <p className="mt-1 text-sm leading-6 text-white/60">{item.phase}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/12 pt-4 text-sm leading-7 text-white/55">
                未來工具將沿著同一條流程補齊，而不是新增成分散的連結。
              </div>
            </div>
          </div>
        </section>

        <section id="flow" className={`border-y ${tokens.border} bg-[#eeece6]`}>
          <div className={`${tokens.container} py-14 lg:py-16`}>
            <div className="mb-9">
              <p className={tokens.eyebrow}>Sales Flow</p>
              <h2 className="mt-3 text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-tight text-[#101417]">營業案件前期經營流程</h2>
            </div>

            <div className="grid gap-3">
              {salesFlow.map((item) => (
                <article key={item.step} className={`grid gap-4 rounded-[10px] p-5 transition duration-200 hover:border-[#d2cec3] hover:bg-[#fffdf9] lg:grid-cols-[112px_minmax(0,1fr)_250px_136px] lg:items-center ${tokens.surface}`}>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#b80f2c]">STEP {item.step}</p>
                    <p className={`mt-2 text-sm font-semibold ${tokens.muted}`}>{item.phase}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold leading-7 text-[#15191d]">{item.question}</p>
                    <p className={`mt-2 text-sm leading-6 ${tokens.muted}`}>{item.outcome}</p>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.toolType === "已可使用" ? "bg-[#b80f2c] text-white" : "border border-[#d8d5cc] text-[#6a777a]"}`}>
                      {item.toolType}
                    </span>
                    <p className="mt-3 text-base font-semibold text-[#15191d]">{item.tool}</p>
                  </div>
                  {item.href ? (
                    <Link href={item.href} className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#15191d] px-4 text-sm font-semibold text-white transition duration-200 hover:bg-[#2a3035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b80f2c]">
                      {item.cta}
                    </Link>
                  ) : (
                    <span className="inline-flex h-11 items-center justify-center rounded-[6px] border border-dashed border-[#c9c5ba] px-4 text-sm font-semibold text-[#6a777a]">
                      {item.cta}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className={`${tokens.container} py-14 lg:py-16`}>
          <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={tokens.eyebrow}>Available Now</p>
              <h2 className="mt-3 text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-tight text-[#101417]">目前可使用工具</h2>
            </div>
            <p className={`max-w-xl text-base leading-7 ${tokens.muted}`}>
              三個工具對應案件前期的前三個關鍵步驟：釐清需求、轉譯場景、找到案例。
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {activeTools.map((item) => (
              <Link key={item.tool} href={item.href} className={`group flex min-h-[310px] flex-col justify-between rounded-[12px] p-6 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d2cec3] hover:shadow-[0_14px_34px_rgba(16,24,40,0.08)] ${tokens.surface}`}>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.18em] text-[#b80f2c]">STEP {item.step}</span>
                    <span className="rounded-full border border-[#d8d5cc] px-3 py-1 text-xs font-semibold text-[#5f6b72]">{item.toolType}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold leading-tight text-[#15191d]">{item.tool}</h3>
                  <p className={`mt-4 text-base leading-7 ${tokens.muted}`}>{item.outcome}</p>
                </div>
                <p className="mt-8 text-sm font-semibold text-[#15191d] transition duration-200 group-hover:text-[#b80f2c]">{item.cta}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="roadmap" className="bg-[#121719] text-white">
          <div className={`${tokens.container} py-14 lg:py-16`}>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0b4bf]">Roadmap</p>
                <h2 className="mt-3 text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-tight">預計增設工具</h2>
              </div>
              <div className="grid gap-3">
                {inProgressTools.map((item) => (
                  <div key={item.tool} className="grid gap-4 rounded-[10px] border border-white/12 bg-white/[0.035] p-5 transition duration-200 hover:bg-white/[0.055] md:grid-cols-[112px_minmax(0,1fr)_112px] md:items-center">
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#f0b4bf]">STEP {item.step}</p>
                    <div>
                      <p className="text-lg font-semibold">{item.tool}</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{item.phase}｜{item.outcome}</p>
                    </div>
                    <span className="inline-flex h-10 items-center justify-center rounded-[6px] border border-white/15 text-sm font-semibold text-white/58">製作中</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#242b2f] bg-[#0e1214] text-white">
        <div className={`${tokens.container} flex flex-col gap-4 py-7 text-sm text-white/60 md:flex-row md:items-center md:justify-between`}>
          <p className="font-semibold text-white">SHAWN FAN</p>
          <p>顧客經營工具箱 / Version 2026 Q3</p>
        </div>
      </footer>
    </div>
  );
}
