import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Billionaire Timer 데모 안내</h1>
      <p className="text-lg text-neutral-600">
        정적 데이터로 동작하는 미리보기 버전입니다. 상단 내비게이션 또는 아래 버튼으로 대시보드를 확인해 보세요.
        Supabase 연동 후에는 실제 계정 기반 데이터가 표시됩니다.
      </p>
      <Button size="lg" asChild>
        <Link href="/dashboard">대시보드 보기</Link>
      </Button>
    </div>
  );
}
