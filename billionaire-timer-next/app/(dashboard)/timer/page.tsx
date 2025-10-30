import { TimerBoard } from "@/components/dashboard/timer-board";
import { mockTimerSessions } from "@/lib/mock-data";

export default function TimerPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">집중 타이머</h1>
        <p className="text-neutral-500">세션을 시작하고 손익을 즉시 확인하세요.</p>
      </header>
      <TimerBoard sessions={mockTimerSessions} />
    </section>
  );
}
