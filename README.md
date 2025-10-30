# 천억부자 타이머 (Billionaire Timer)

> 프리미엄 자산가를 위한 생산성 스위트 - 시간을 수익으로 전환하는 스마트 타이머

[![Live Demo](https://img.shields.io/badge/Live-Demo-gold?style=for-the-badge)](https://billionairetimer.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🎯 프로젝트 개요

천억부자 타이머는 **시간 가치를 시각화**하여 생산성을 극대화하는 웹 애플리케이션입니다. 뽀모도로 타이머와 TODO 관리, 수입 추적을 통합하여 사용자가 목표 달성을 위한 구체적인 액션을 취할 수 있도록 돕습니다.

### 핵심 가치 제안
- ⏱️ **시간의 금전적 가치 시각화**: 현재 시급 vs 목표 시급
- 🎯 **목표 기반 작업 관리**: 수익 창출 작업에 집중
- 📊 **실시간 성과 추적**: 수익/손실, 연속 성공 기록
- 💡 **아이디어 → 실행 전환**: 생각을 즉시 액션으로 변환

## ✨ 주요 기능

### 1. 목표 설정 & 시급 계산기
- 현재 시급과 목표 시급 입력
- 월급/연봉 자동 환산
- 일일 필요 집중 시간 계산
- 성장률 시각화

### 2. 스마트 타이머
- 뽀모도로 타이머 통합
- 작업별 시간 추적 (15/30/60/90/120분)
- 실시간 수익/손실 계산
- 알림 & 사운드 피드백

### 3. 할일(TODO) 관리
- 간편한 작업 추가/수정/삭제
- 시간 예측 슬라이더
- 예상 수익 미리보기
- 타이머 원클릭 시작

### 4. 아이디어 뱅크
- 빠른 아이디어 캡처
- 아이디어 → 할일 전환
- 시간 재설정 기능

### 5. 성과 대시보드
- 총 수익/손실 실시간 표시
- 연속 성공 일수 추적
- 주간/전체 작업 통계
- 시각화된 성과 보고서

### 6. 설정 & 커스터마이징
- 손실 표시 on/off
- 방해 사이트 경고
- 알림 & 사운드 토글
- 자동 재배치 기능
- 집중 효율 조정 (기본 70%)

## 🏗️ 기술 스택

### 현재 버전 (v1.0 - MVP)
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 (Gradient, Flexbox, Grid)
- **Storage**: localStorage (클라이언트 사이드)
- **Deployment**: GitHub Pages
- **PWA**: Service Worker + Web Manifest

### 향후 마이그레이션 계획 (v2.0)
```
📦 Next.js 15 (App Router)
├── 🎨 Tailwind CSS + shadcn/ui
├── 🗄️ Supabase (Auth + Database + Storage)
├── 🔐 NextAuth.js / Supabase Auth
├── 📊 Recharts / Chart.js
├── 🚀 Vercel Deployment
└── 🧪 Vitest + Playwright
```

## 📂 프로젝트 구조

```
Billionaire-Timer-TODO/
├── billionaire-timer-ghpages-patch5/  # 현재 정적 빌드
│   ├── index.html                      # 메인 앱 (3358 lines)
│   ├── manifest.webmanifest            # PWA manifest
│   ├── sw.js                           # Service worker
│   ├── offline.html                    # 오프라인 페이지
│   └── icons/                          # 앱 아이콘
│       ├── icon-192.png
│       └── icon-512.png
├── README.md                           # 프로젝트 문서
├── PRD.md                              # 제품 요구사항
├── TRD.md                              # 기술 요구사항
└── IA.md                               # 정보 구조
```

## 🚀 빠른 시작

### 로컬 개발
```bash
# 1. 저장소 클론
git clone https://github.com/hosubi/Billionaire-Timer-TODO.git
cd Billionaire-Timer-TODO/billionaire-timer-ghpages-patch5

# 2. 로컬 서버 실행 (Python)
python -m http.server 8000

# 3. 브라우저에서 열기
open http://localhost:8000
```

### 데이터 구조
```javascript
appData = {
  goals: {
    currentRate: number,  // 현재 시급
    targetRate: number    // 목표 시급
  },
  todos: [
    { id, title, time, status, createdAt }
  ],
  ideas: [
    { id, content, createdAt }
  ],
  stats: {
    totalProfit: number,
    totalLoss: number,
    successDays: number,
    currentStreak: number,
    longestStreak: number,
    thisWeekTasks: number,
    totalTasks: number,
    lastActiveDate: string,
    recentCompletions: [],
    history: []
  },
  timer: {
    isRunning: boolean,
    isPaused: boolean,
    timeLeft: number,
    totalTime: number,
    currentTask: object | null
  },
  settings: {
    showLoss: boolean,
    siteWarning: boolean,
    notifications: boolean,
    sound: boolean,
    motivationBanner: boolean,
    autoReschedule: boolean,
    focusEfficiency: 0.7
  }
}
```

## 📱 사용 방법

### 1단계: 목표 설정
1. 현재 시급 입력 (예: 50,000원)
2. 목표 시급 입력 (예: 100,000원)
3. 자동으로 월급/연봉 차이 계산
4. "여정 시작하기" 클릭

### 2단계: 할일 추가
1. "할 일" 탭에서 "+" 버튼
2. 작업 제목 입력
3. 예상 소요 시간 선택 (15/30/60/90/120분)
4. 예상 수익 확인 후 저장

### 3단계: 타이머 시작
1. 할일 카드에서 "▶ 시작" 버튼
2. 집중해서 작업 수행
3. 완료 시 "✓ 완료" 또는 포기 시 "✗ 포기"
4. 자동으로 수익/손실 기록

### 4단계: 성과 확인
1. 헤더에서 실시간 순수익 & 연속 성공 확인
2. "📊" 버튼으로 상세 보고서 열기
3. 차트로 수익/손실 비율 분석

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Gold**: `#d4af37` (골드 강조)
- **Secondary**: `#b8860b` (다크 골드)
- **Background**: `#ffffff` → `#f8f9fa` (그라데이션)
- **Text**: `#000000` (메인), `#666666` (서브)
- **Success**: `#28a745`
- **Danger**: `#dc3545`
- **Warning**: `#ffc107`

### 타이포그래피
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic'
- **Font Sizes**: 12px ~ 24px
- **Font Weights**: 400 (regular), 600 (semi-bold), 700 (bold)

## 📊 성과 지표 (Metrics)

### 사용자 경험
- ⚡ **로딩 속도**: < 1초 (정적 HTML)
- 📱 **반응형**: 모바일/태블릿/데스크톱
- 🎯 **PWA 점수**: Lighthouse 90+
- ♿ **접근성**: 키보드 네비게이션 지원

### 비즈니스 목표
- 🎯 일일 활성 사용자 (DAU) 증가
- 📈 평균 세션 시간 15분+
- 🔄 주간 재방문율 60%+
- ⭐ 작업 완료율 70%+

## 🛣️ 로드맵

### Phase 1: MVP 완성 ✅ (현재)
- [x] 기본 타이머 기능
- [x] TODO/아이디어 관리
- [x] 수익/손실 추적
- [x] 성과 보고서
- [x] PWA 구현
- [x] SEO 최적화

### Phase 2: Next.js 마이그레이션 (진행 예정)
- [ ] Next.js 15 + App Router 세팅
- [ ] Supabase 데이터베이스 연동
- [ ] 사용자 인증 (이메일/소셜 로그인)
- [ ] Tailwind CSS + shadcn/ui 적용
- [ ] 서버 컴포넌트 최적화
- [ ] Vercel 배포 자동화

### Phase 3: 고급 기능 추가
- [ ] 팀/협업 기능
- [ ] 고급 통계 & 인사이트
- [ ] AI 기반 작업 추천
- [ ] 모바일 앱 (React Native)
- [ ] Slack/Notion 연동
- [ ] 유료 프리미엄 기능

## 🤝 기여 가이드

### 브랜치 전략
- `main`: 프로덕션 브랜치 (GitHub Pages 배포)
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발
- `fix/*`: 버그 수정
- `claude/*`: AI 자동 작업

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
```

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 📞 문의

- **Website**: https://billionairetimer.app
- **GitHub**: https://github.com/hosubi/Billionaire-Timer-TODO
- **Email**: [프로젝트 관리자 이메일]

---

<div align="center">

**⏱️ 시간은 돈이다. 현명하게 사용하자. ⏱️**

Made with 💛 for ambitious achievers

</div>
