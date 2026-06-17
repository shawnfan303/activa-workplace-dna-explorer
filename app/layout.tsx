import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACTIVA Workplace DNA Explorer",
  description: "Explore workplace DNA profiles and ACTIVA scene recommendations."
};

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/quiz", label: "問卷" },
  { href: "/result", label: "結果" },
  { href: "/scenes", label: "場景資料" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <header className="border-b border-aurora-line bg-white">
          <nav className="aurora-container flex min-h-16 items-center justify-between gap-6">
            <Link href="/" className="text-sm font-bold tracking-wide text-aurora-ink">
              ACTIVA Workplace DNA Explorer
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
        <main>{children}</main>
      </body>
    </html>
  );
}
