import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "營業案件前期經營工具箱",
  description: "讓營業依照案件前期開發進度，挑選 Discovery Assistant、Workplace DNA 與 Case Match Engine。"
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
