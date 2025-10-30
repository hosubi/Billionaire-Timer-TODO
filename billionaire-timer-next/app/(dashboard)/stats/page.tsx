import { StatsDashboard } from "@/components/stats/stats-dashboard";
import { mockStats } from "@/lib/mock-data";

export default function StatsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">성과 분석</h1>
        <p className="text-neutral-500">주간 성과와 성공률을 한눈에 확인하세요.</p>
      </header>
      <StatsDashboard stats={mockStats} />
    </section>
  );
}
