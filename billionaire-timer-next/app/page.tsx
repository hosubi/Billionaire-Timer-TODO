import Link from "next/link";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    heading: "수익 기반 집중",
    text: "세션마다 예상 수익과 손실을 즉시 계산합니다."
  },
  {
    heading: "AI TODO 자동화",
    text: "해야 할 일을 스케줄링하고 자동 재배정하세요."
  },
  {
    heading: "PWA 지원",
    text: "모바일에서도 설치해 오프라인 모드로 사용할 수 있습니다."
  }
] as const;

export default function LandingPage() {
  return (
    <main className="hero-gradient flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/20 via-white to-white px-6 text-center">
      <span className="rounded-full border border-primary/30 bg-white px-4 py-1 text-sm font-medium text-primary shadow-soft">
        Beta 대시보드 준비 완료
      </span>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
        시간의 가치를 극대화하는 Billionaire Timer
      </h1>
      <p className="max-w-2xl text-lg text-neutral-600 md:text-xl">
        목표 수입을 기준으로 집중 세션을 설계하고, 실시간 손익을 추적하며 성공 습관을 쌓을 수 있는 프리미엄 타이머 앱입니다.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/sign-in">대시보드 로그인</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/dashboard">미리보기</Link>
        </Button>
      </div>
      <ul className="mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left md:grid-cols-3">
        {featureCards.map((item) => (
          <li key={item.heading} className="rounded-xl border border-neutral-100 bg-white p-4 shadow-soft">
            <h3 className="text-base font-semibold">{item.heading}</h3>
            <p className="text-sm text-neutral-500">{item.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
