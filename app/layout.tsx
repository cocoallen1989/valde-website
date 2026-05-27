import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VALDE 潤鋒 | 建材供應鏈 智慧報價與落地執行平台",
  description: "設計師上傳平面圖或立面圖後，Valde 依照空間需求與預算條件，協助整理可供應的地板、衛浴、廚具、系統櫃與住宅配套建材方案。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
