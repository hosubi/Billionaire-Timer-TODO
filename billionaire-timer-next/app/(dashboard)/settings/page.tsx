import { SettingsPanel } from "@/components/dashboard/settings-panel";
import { mockSettings } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">환경설정</h1>
        <p className="text-neutral-500">집중 알림과 자동 재배정 옵션을 조정하세요.</p>
      </header>
      <SettingsPanel settings={mockSettings} />
    </section>
  );
}
