import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { OnboardingBanner } from "@/components/onboarding-banner";

export const metadata: Metadata = {
  metadataBase: new URL("https://billionairetimer.app"),
  title: "Billionaire Timer",
  description: "뇌과학 기반 도파민 타이머로 목표 수입을 현실로 만드는 브라우저 캐시 기반 MVP",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Billionaire Timer",
    description: "시간을 자산으로 바꾸는 집중 타이머와 게임화된 TODO 관리",
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
    description: "도파민 보상 루프와 집중 타이머로 실행력을 높여보세요.",
    images: ["/og-cover.png"]
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <OnboardingBanner />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
