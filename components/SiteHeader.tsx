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
    <header className="border-b border-aurora-line bg-white">
      <nav className="aurora-container flex min-h-20 items-center justify-between gap-6">
        <Link href="/customer-toolbox" className="flex items-center gap-4 text-sm font-bold tracking-wide text-aurora-ink">
          <img className="h-14 w-auto" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
          <span className="hidden sm:inline">震旦家具 AURORA Furniture</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-aurora-graphite">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 font-semibold transition hover:text-aurora-red ${isActive(item.href) ? "text-aurora-red" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
