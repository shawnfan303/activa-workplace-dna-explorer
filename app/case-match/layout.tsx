import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AURORA Case Match Engine",
  description: "用公開案例快速找到適合企業客戶的辦公空間參考。"
};

export default function CaseMatchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
