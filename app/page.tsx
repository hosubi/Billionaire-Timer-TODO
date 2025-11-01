import Link from "next/link";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    heading: "수익 기반 집중",
    text: "세션마다 예상 수익과 손실을 바로 확인하고 실행력을 끌어올리세요."
  },
  {
    heading: "게임화된 TODO",
    text: "작업을 완료할 때마다 도파민 보상을 얻고 스트릭을 유지할 수 있습니다."
  },
  {
    heading: "PWA 지원",
    text: "브라우저 캐시에 저장되어 오프라인에서도 대시보드를 확인할 수 있습니다."
  }
] as const;

export default function LandingPage() {
  return (
    <main className="hero-gradient flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/10 via-white to-white px-6 text-center">
      <span className="rounded-full border border-primary/30 bg-white px-4 py-1 text-sm font-medium text-primary shadow-soft">
        Beta 데모 준비 완료
      </span>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
        게임처럼 즐기는 도파민 타이머로 실행력을 키워보세요
      </h1>
      <p className="max-w-2xl text-lg text-neutral-600 md:text-xl">
        목표 수입을 기준으로 집중 시간을 설계하고, 브라우저 캐시에 저장된 보상 데이터를 통해 꾸준히 성장할 수
        있습니다.
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
            <h3 className="text-base font-semibold text-neutral-900">{item.heading}</h3>
            <p className="text-sm text-neutral-500">{item.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
