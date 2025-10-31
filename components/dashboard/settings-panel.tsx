"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { SettingsSnapshot } from "@/lib/types";
import { useState } from "react";

export function SettingsPanel({ settings }: { settings: SettingsSnapshot }) {
  const [state, setState] = useState(settings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>집중 환경 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ToggleRow
          label="손실 표시"
          description="세션 실패 시 추정 손실을 대시보드에 표시합니다."
          value={state.showLoss}
          onChange={(value) => setState((prev) => ({ ...prev, showLoss: value }))}
        />
        <ToggleRow
          label="사이트 경고"
          description="방해 요소 감지 시 경고 배너를 표시합니다."
          value={state.siteWarning}
          onChange={(value) => setState((prev) => ({ ...prev, siteWarning: value }))}
        />
        <ToggleRow
          label="알림"
          description="세션 시작과 종료 시 웹 푸시 알림을 보냅니다."
          value={state.notifications}
          onChange={(value) => setState((prev) => ({ ...prev, notifications: value }))}
        />
        <ToggleRow
          label="사운드"
          description="세션 종료 시 효과음을 재생합니다."
          value={state.sound}
          onChange={(value) => setState((prev) => ({ ...prev, sound: value }))}
        />
        <ToggleRow
          label="동기 배너"
          description="대시보드 상단에 동기 부여 문구를 표시합니다."
          value={state.motivationBanner}
          onChange={(value) => setState((prev) => ({ ...prev, motivationBanner: value }))}
        />
        <ToggleRow
          label="자동 재배정"
          description="실패한 태스크를 다음 가능한 시간으로 자동 재배정합니다."
          value={state.autoReschedule}
          onChange={(value) => setState((prev) => ({ ...prev, autoReschedule: value }))}
        />
        <div className="space-y-2">
          <Label htmlFor="focus-efficiency">집중 효율</Label>
          <Slider
            id="focus-efficiency"
            min={0.4}
            max={1}
            step={0.05}
            value={[state.focusEfficiency]}
            onValueChange={(value) => setState((prev) => ({ ...prev, focusEfficiency: value[0] ?? prev.focusEfficiency }))}
          />
          <p className="text-xs text-neutral-500">
            현재 효율 {Math.round(state.focusEfficiency * 100)}% · 목표 달성 계산에 반영됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-neutral-100 bg-white p-4">
      <div>
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
