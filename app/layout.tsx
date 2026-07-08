import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACTIVA Workplace DNA Explorer",
  description: "透過 Workplace DNA 問卷診斷企業工作場域需求，推薦 ACTIVA 辦公場景卡。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
