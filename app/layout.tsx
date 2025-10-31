import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://billionairetimer.app"),
  title: "Billionaire Timer",
  description: "시간을 자산으로 바꾸는 프리미엄 집중 타이머 & 목표 관리 PWA",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Billionaire Timer",
    description: "목표 수입을 기준으로 집중과 수익을 추적하세요.",
    url: "https://billionairetimer.app",
    siteName: "Billionaire Timer",
    locale: "ko_KR",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Billionaire Timer Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Billionaire Timer",
    description: "집중 습관과 수익 지표를 한눈에 확인하세요.",
    images: ["/og-cover.png"]
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
