"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/assets";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/customer-toolbox", label: "顧客經營工具箱" },
  { href: "/quiz", label: "Workplace DNA" },
  { href: "/result", label: "結果" },
  { href: "/scenes", label: "場景資料" }
];

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/customer-toolbox")) {
    return null;
  }

  return (
    <header className="border-b border-aurora-line bg-white">
      <nav className="aurora-container flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4 text-sm font-bold tracking-wide text-aurora-ink">
          <img className="h-14 w-auto" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
          <span className="hidden sm:inline">ACTIVA Workplace DNA Explorer</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-aurora-graphite">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 transition hover:text-aurora-red">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
