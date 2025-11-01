"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBrowserCache } from "@/app/hooks/use-browser-cache";

const ONBOARDING_CACHE_KEY = "onboarding-dismissed";

export function OnboardingBanner() {
  const { load, save } = useBrowserCache();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = load<boolean>(ONBOARDING_CACHE_KEY, false);
    if (!dismissed) {
      setVisible(true);
    }
  }, [load]);

  const handleDismiss = () => {
    save(ONBOARDING_CACHE_KEY, true);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-xl backdrop-blur md:inset-x-auto md:left-1/2 md:w-[420px] md:-translate-x-1/2">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">첫 번째 도파민 미션을 시작해볼까요?</p>
          <p className="text-xs text-neutral-500">
            시급과 목표 금액을 입력하고 타이머를 실행하면 브라우저 캐시에 바로 저장돼 다음 방문에서도 이어집니다.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            나중에 할게요
          </Button>
          <Button size="sm" onClick={handleDismiss}>
            바로 시작
          </Button>
        </div>
      </div>
    </div>
  );
}
