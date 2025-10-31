# Billionaire Timer (Next.js MVP)

Next.js 15 + shadcn/ui 기반으로 구성한 프리미엄 집중 타이머 MVP입니다.  
정적 Mock 데이터를 사용해 전체 UX 플로우를 확인할 수 있으며, 이후 Supabase/NextAuth 연동을 손쉽게 확장할 수 있도록 구조화했습니다.

## 기술 스택

- Framework: Next.js 15 (App Router, TypeScript)
- UI: Tailwind CSS 3.4, shadcn/ui, lucide-react
- 상태 관리: Zustand (타이머), React Query(준비)
- 차트: Recharts
- PWA: next-pwa (manifest + service worker)
- 배포 대상: Vercel

## 프로젝트 구조

```
app/
  layout.tsx            # 전역 메타데이터/ThemeProvider
  page.tsx              # 랜딩 페이지
  (auth)/sign-in/       # 로그인 화면
  (dashboard)/          # 공통 대시보드 레이아웃
  goals/                # 목표 설정 페이지
  timer/                # 세션 보드
  todos/                # TODO 칸반
  ideas/                # 아이디어 뱅크
  stats/                # 성과 리포트
  settings/             # 환경 설정
components/
  dashboard/*           # 대시보드 위젯
  goals/*, todos/* ...  # 도메인별 UI
  ui/*                  # shadcn/ui 기반 컴포넌트
lib/
  mock-data.ts          # 정적 Mock 데이터
  types.ts              # 타입 정의
  utils.ts              # Tailwind 헬퍼
store/
  timer-store.ts        # 타이머 상태
public/
  icons/                # PWA 아이콘
  og-cover.png          # SNS 미리보기
```

## 설치 & 실행

```bash
npm install
npm run dev
```

- 개발 서버: http://localhost:3000
- PWA 오프라인은 production 모드(`npm run build && npm run start`)에서 동작합니다.

## Vercel 배포 시 체크리스트

1. Git 리포지토리에 현재 디렉터리(`billionaire-timer-next`) 전체를 커밋 후 푸시합니다.
2. Vercel 프로젝트를 생성해 빌드 커맨드 `npm run build`, 출력 디렉터리 `.next`로 설정합니다.
3. 환경 변수는 추후 Supabase/NextAuth 연동 단계에서 추가합니다.

## 다음 단계 제안

- Supabase 스키마 정의 및 `.env.local` 구성
- NextAuth로 로그인 플로우 교체 및 API 라우트 연결
- Mock 데이터를 실제 쿼리로 교체하고 React Query 캐싱 적용
- Vitest/Playwright 테스트 파이프라인 구성
