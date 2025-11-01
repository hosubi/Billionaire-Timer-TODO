import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAYROLL_CONSTANTS } from "@/lib/services/payroll";

export default function DemoPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Offline Friendly MVP
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          브라우저 캐시만으로 체험하는 Billionaire Timer
        </h1>
        <p className="mt-3 text-base text-neutral-600">
          이 데모는 Supabase 없이도 동작하도록 모든 상태를 로컬 캐시에 저장합니다. 포커스 세션, 급여 계산기, TODO
          보상 데이터를 직접 입력해 보고 다음 방문 때 이어서 확인해 보세요.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. 급여 계산기 세팅</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>현재 시급 또는 월급을 입력하면 나머지 항목이 자동으로 환산됩니다.</p>
            <p>
              기본 가정은 하루 {PAYROLL_CONSTANTS.WORK_HOURS_PER_DAY}시간 집중, 월 {PAYROLL_CONSTANTS.WORK_DAYS_PER_MONTH}
              일 근무입니다.
            </p>
            <p>목표 급여를 설정하면 하루 필요한 집중 시간과 예상 달성 일이 계산됩니다.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2. 도파민 타이머 실행</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>포모도로 타이머를 돌리면 집중/휴식 라운드가 자동으로 캐시에 저장됩니다.</p>
            <p>세션을 완료하면 스트릭과 손익 추적 지표가 업데이트되어 보상을 확인할 수 있습니다.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3. TODO 보상 시스템</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>해야 할 일을 등록하면 예상 집중 시간과 보상 금액(도파민 코인)이 표시됩니다.</p>
            <p>작업 상태를 변경하면 브라우저 캐시에 자동 저장되어 다음 접속 때 이어집니다.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>4. 오프라인에서도 동작</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>네트워크 없이 접속해도 마지막으로 저장된 데이터를 기반으로 대시보드를 확인할 수 있습니다.</p>
            <p>Supabase 연동 전까지는 모든 데이터가 기기 안에서만 저장됩니다.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg" asChild>
          <Link href="/dashboard">대시보드 체험하기</Link>
        </Button>
      </div>
    </div>
  );
}
