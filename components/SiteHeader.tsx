"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/assets";

const navItems = [
  { href: "/customer-toolbox", label: "首頁" },
  { href: "/discovery-assistant", label: "工具一｜Discovery Assistant" },
  { href: "/", label: "工具二｜Workplace DNA" },
  { href: "/case-match", label: "工具三｜Case Match Engine" }
];

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/customer-toolbox") || pathname.startsWith("/toolbox-redesign-demo")) {
    return null;
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/quiz") || pathname.startsWith("/questionnaire") || pathname.startsWith("/result") || pathname.startsWith("/results") || pathname.startsWith("/scenes");
    }

    return pathname === href || pathname.startsWith(href);
  }

  return (
    <header className="border-b border-aurora-line bg-white/95">
      <nav className="aurora-container flex min-h-16 items-center justify-between gap-4">
        <Link href="/customer-toolbox" className="flex flex-none items-center gap-3 font-bold text-aurora-ink">
          <img className="h-10 w-auto md:h-12" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
          <span className="hidden whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-aurora-red sm:inline md:text-sm">Sales development toolbox</span>
        </Link>
        <div className="flex flex-nowrap items-center justify-end gap-1 text-sm text-aurora-graphite">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-[6px] px-2.5 py-2 font-semibold transition duration-200 hover:bg-aurora-soft hover:text-aurora-red ${isActive(item.href) ? "bg-aurora-soft text-aurora-red" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
