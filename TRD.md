# Technical Requirements Document (TRD)
# 천억부자 타이머 (Billionaire Timer)

**문서 버전**: 2.0
**최종 수정일**: 2025-10-30
**작성자**: Engineering Team
**상태**: In Development

---

## 📋 목차

1. [시스템 개요](#1-시스템-개요)
2. [기술 스택](#2-기술-스택)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [데이터 모델](#4-데이터-모델)
5. [API 설계](#5-api-설계)
6. [프론트엔드 설계](#6-프론트엔드-설계)
7. [백엔드 설계](#7-백엔드-설계)
8. [데이터베이스 설계](#8-데이터베이스-설계)
9. [보안 & 인증](#9-보안--인증)
10. [성능 최적화](#10-성능-최적화)
11. [배포 & 인프라](#11-배포--인프라)
12. [모니터링 & 로깅](#12-모니터링--로깅)
13. [테스트 전략](#13-테스트-전략)
14. [마이그레이션 계획](#14-마이그레이션-계획)

---

## 1. 시스템 개요

### 1.1 현재 아키텍처 (v1.0 - MVP)

```
┌─────────────────────────────────────────┐
│         Client (Browser)                │
│  ┌───────────────────────────────────┐  │
│  │    Static HTML + CSS + JS         │  │
│  │    (index.html - 3358 lines)      │  │
│  └───────────────────────────────────┘  │
│              ↕ localStorage             │
│  ┌───────────────────────────────────┐  │
│  │    Service Worker (sw.js)         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│       GitHub Pages (CDN)                │
│   https://billionairetimer.app          │
└─────────────────────────────────────────┘
```

### 1.2 목표 아키텍처 (v2.0 - Next.js)

```
┌─────────────────────────────────────────────────────┐
│                  Client (Browser)                    │
│  ┌───────────────────────────────────────────────┐  │
│  │  Next.js 15 (App Router) + React 19          │  │
│  │  Tailwind CSS + shadcn/ui                     │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
         ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────┐
│              Vercel Edge Network                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Next.js Server Components + API Routes      │  │
│  │  Edge Functions                               │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
         ↕ PostgreSQL Protocol
┌─────────────────────────────────────────────────────┐
│              Supabase Backend                        │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ PostgreSQL  │  │ Auth Service │  │  Storage  │  │
│  └─────────────┘  └──────────────┘  └───────────┘  │
│  ┌─────────────┐  ┌──────────────┐                  │
│  │  Realtime   │  │  Edge Funcs  │                  │
│  └─────────────┘  └──────────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

## 2. 기술 스택

### 2.1 현재 스택 (v1.0)

| 레이어 | 기술 | 버전 | 용도 |
|--------|------|------|------|
| **Frontend** | Vanilla JavaScript | ES6+ | 핵심 로직 |
| | HTML5 | - | 마크업 |
| | CSS3 | - | 스타일링 (Gradient, Flexbox, Grid) |
| **Storage** | localStorage | - | 클라이언트 사이드 데이터 저장 |
| **PWA** | Service Worker | - | 오프라인 지원, 캐싱 |
| | Web Manifest | - | 앱 메타데이터 |
| **Hosting** | GitHub Pages | - | 정적 호스팅 |
| **Domain** | Custom Domain | - | billionairetimer.app |

### 2.2 목표 스택 (v2.0)

#### Frontend Stack
```typescript
{
  "framework": "Next.js 15",
  "language": "TypeScript 5.3+",
  "ui": {
    "library": "React 19",
    "styling": "Tailwind CSS 3.4+",
    "components": "shadcn/ui",
    "icons": "lucide-react",
    "animations": "framer-motion"
  },
  "stateManagement": {
    "global": "Zustand",
    "server": "React Query (TanStack Query)",
    "form": "React Hook Form + Zod"
  },
  "charts": "Recharts",
  "date": "date-fns",
  "notifications": "sonner"
}
```

#### Backend Stack
```typescript
{
  "platform": "Supabase",
  "database": "PostgreSQL 15+",
  "auth": "Supabase Auth (JWT)",
  "storage": "Supabase Storage",
  "realtime": "Supabase Realtime (WebSocket)",
  "functions": "Edge Functions (Deno)"
}
```

#### DevOps Stack
```typescript
{
  "hosting": "Vercel",
  "cicd": "GitHub Actions",
  "monitoring": "Vercel Analytics",
  "logging": "Vercel Logs",
  "testing": {
    "unit": "Vitest",
    "e2e": "Playwright",
    "coverage": "Istanbul"
  },
  "linting": {
    "code": "ESLint",
    "types": "TypeScript",
    "style": "Prettier"
  }
}
```

### 2.3 무료 라이브러리 목록

| 목적 | 라이브러리 | 라이선스 | 이유 |
|------|-----------|----------|------|
| UI 컴포넌트 | shadcn/ui | MIT | 커스터마이징 용이, Radix UI 기반 |
| 아이콘 | lucide-react | ISC | 일관된 디자인, 트리 쉐이킹 |
| 차트 | Recharts | MIT | React 네이티브, 반응형 |
| 폼 | React Hook Form | MIT | 성능 최적화, Zod 통합 |
| 밸리데이션 | Zod | MIT | TypeScript 친화적 |
| 상태 관리 | Zustand | MIT | 간단한 API, 보일러플레이트 적음 |
| 서버 상태 | TanStack Query | MIT | 캐싱, 자동 리페칭 |
| 애니메이션 | Framer Motion | MIT | 선언적 API, 성능 최적화 |
| 날짜 | date-fns | MIT | 모듈화, Tree-shakeable |
| 알림 | sonner | MIT | 아름다운 토스트 |

---

## 3. 시스템 아키텍처

### 3.1 현재 아키텍처 (v1.0)

#### 파일 구조
```
billionaire-timer-ghpages-patch5/
├── index.html              # 메인 앱 (3358 lines)
│   ├── <head>              # 메타 태그, SEO
│   ├── <style>             # CSS (약 1500 lines)
│   ├── <body>              # HTML 구조
│   └── <script>            # JavaScript (약 1800 lines)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker
├── offline.html            # 오프라인 페이지
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

#### 코드 구조 (index.html 내부)
```javascript
// 전역 변수
let appData = { goals, todos, ideas, stats, timer, settings };
let editingTodoId = null;
let convertingIdeaId = null;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadAppData();
  setupEventListeners();
  initializeApp();
});

// 핵심 모듈
// 1. 데이터 관리
function loadAppData() { ... }
function saveAppData() { ... }

// 2. 목표 설정
function updateConversions() { ... }
function saveGoalsAndStart() { ... }
function showGoalSetup() { ... }

// 3. 할일 관리
function showTodoForm() { ... }
function saveTodo() { ... }
function startTimer(todoId) { ... }

// 4. 타이머
function updateTimer() { ... }
function completeTask() { ... }
function abandonTask() { ... }

// 5. 통계
function updateAllDisplays() { ... }
function updateHeaderStatus() { ... }
function updateStatsDisplay() { ... }

// 6. UI 업데이트
function renderTodos() { ... }
function renderIdeas() { ... }
function showReport() { ... }
```

### 3.2 목표 아키텍처 (v2.0)

#### 디렉토리 구조
```
billionaire-timer-nextjs/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # 인증 레이아웃
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/              # 대시보드 레이아웃
│   │   ├── layout.tsx
│   │   ├── page.tsx              # 메인 대시보드
│   │   ├── goals/page.tsx
│   │   ├── todos/page.tsx
│   │   ├── ideas/page.tsx
│   │   └── stats/page.tsx
│   ├── api/                      # API Routes
│   │   ├── todos/route.ts
│   │   ├── timer/route.ts
│   │   └── stats/route.ts
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 랜딩 페이지
│   └── globals.css               # Tailwind 글로벌 스타일
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── nav.tsx
│   │   └── footer.tsx
│   ├── dashboard/                # 대시보드 컴포넌트
│   │   ├── goal-card.tsx
│   │   ├── stats-overview.tsx
│   │   └── progress-circle.tsx
│   ├── todo/                     # 할일 컴포넌트
│   │   ├── todo-list.tsx
│   │   ├── todo-item.tsx
│   │   ├── todo-form.tsx
│   │   └── todo-timer.tsx
│   ├── idea/                     # 아이디어 컴포넌트
│   │   ├── idea-list.tsx
│   │   └── idea-form.tsx
│   └── charts/                   # 차트 컴포넌트
│       ├── revenue-chart.tsx
│       └── streak-chart.tsx
├── lib/                          # 유틸리티
│   ├── supabase/
│   │   ├── client.ts             # Supabase 클라이언트
│   │   └── server.ts             # Supabase 서버
│   ├── utils.ts                  # 공통 유틸
│   ├── calculations.ts           # 수익/시급 계산
│   └── validations.ts            # Zod 스키마
├── hooks/                        # Custom Hooks
│   ├── use-timer.ts
│   ├── use-todos.ts
│   └── use-stats.ts
├── stores/                       # Zustand 스토어
│   ├── app-store.ts
│   ├── timer-store.ts
│   └── settings-store.ts
├── types/                        # TypeScript 타입
│   ├── database.types.ts         # Supabase 자동 생성
│   └── app.types.ts
├── public/                       # 정적 파일
│   ├── icons/
│   └── images/
├── supabase/                     # Supabase 설정
│   ├── migrations/
│   └── seed.sql
├── tests/                        # 테스트
│   ├── unit/
│   └── e2e/
├── .env.local                    # 환경 변수
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. 데이터 모델

### 4.1 현재 데이터 모델 (localStorage)

#### appData 구조
```typescript
interface AppData {
  goals: {
    currentRate: number;    // 현재 시급 (원)
    targetRate: number;     // 목표 시급 (원)
  };

  todos: Todo[];
  ideas: Idea[];

  stats: {
    totalProfit: number;         // 총 수익
    totalLoss: number;           // 총 손실
    successDays: number;         // 성공 일수
    failDays: number;            // 실패 일수
    currentStreak: number;       // 현재 연속 성공
    longestStreak: number;       // 최장 연속 성공
    thisWeekTasks: number;       // 이번 주 작업 수
    totalTasks: number;          // 총 작업 수
    lastActiveDate: string | null;  // 마지막 활동 날짜 (ISO)
    recentCompletions: Completion[];  // 최근 완료 항목
    history: HistoryEntry[];     // 히스토리
  };

  timer: {
    isRunning: boolean;
    isPaused: boolean;
    timeLeft: number;       // 남은 시간 (초)
    totalTime: number;      // 총 시간 (초)
    currentTask: Todo | null;
    interval: number | null;
  };

  settings: {
    showLoss: boolean;           // 손실 표시
    siteWarning: boolean;        // 방해 사이트 경고
    notifications: boolean;      // 알림
    sound: boolean;              // 사운드
    motivationBanner: boolean;   // 동기부여 배너
    autoReschedule: boolean;     // 자동 재배치
    focusEfficiency: number;     // 집중 효율 (0.5~1.0)
  };
}

interface Todo {
  id: string;              // UUID
  title: string;
  time: number;            // 예상 시간 (분)
  status: 'pending' | 'running' | 'completed' | 'abandoned';
  createdAt: string;       // ISO 8601
  startedAt?: string;
  completedAt?: string;
}

interface Idea {
  id: string;
  content: string;
  createdAt: string;
}

interface Completion {
  id: string;
  title: string;
  profit: number;
  completedAt: string;
}

interface HistoryEntry {
  date: string;            // YYYY-MM-DD
  profit: number;
  loss: number;
  tasksCompleted: number;
}
```

### 4.2 목표 데이터 모델 (Supabase PostgreSQL)

#### ERD (Entity Relationship Diagram)
```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │ UUID
│ email           │ VARCHAR
│ created_at      │ TIMESTAMP
│ updated_at      │ TIMESTAMP
└─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐
│   user_goals    │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ current_rate    │ INTEGER
│ target_rate     │ INTEGER
│ created_at      │ TIMESTAMP
│ updated_at      │ TIMESTAMP
└─────────────────┘

┌─────────────────┐
│     users       │
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐
│      todos      │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ title           │ VARCHAR(255)
│ time            │ INTEGER
│ status          │ ENUM
│ created_at      │ TIMESTAMP
│ started_at      │ TIMESTAMP
│ completed_at    │ TIMESTAMP
│ profit          │ INTEGER
│ loss            │ INTEGER
└─────────────────┘

┌─────────────────┐
│     users       │
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐
│      ideas      │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ content         │ TEXT
│ created_at      │ TIMESTAMP
│ converted_to_todo_id │ UUID (nullable)
└─────────────────┘

┌─────────────────┐
│     users       │
└─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐
│   user_stats    │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ total_profit    │ INTEGER
│ total_loss      │ INTEGER
│ success_days    │ INTEGER
│ fail_days       │ INTEGER
│ current_streak  │ INTEGER
│ longest_streak  │ INTEGER
│ this_week_tasks │ INTEGER
│ total_tasks     │ INTEGER
│ last_active_date│ DATE
│ updated_at      │ TIMESTAMP
└─────────────────┘

┌─────────────────┐
│     users       │
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐
│ daily_history   │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ date            │ DATE
│ profit          │ INTEGER
│ loss            │ INTEGER
│ tasks_completed │ INTEGER
│ tasks_abandoned │ INTEGER
│ focus_time      │ INTEGER (분)
└─────────────────┘

┌─────────────────┐
│     users       │
└─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐
│ user_settings   │
├─────────────────┤
│ id (PK)         │ UUID
│ user_id (FK)    │ UUID
│ show_loss       │ BOOLEAN
│ site_warning    │ BOOLEAN
│ notifications   │ BOOLEAN
│ sound           │ BOOLEAN
│ motivation_banner│ BOOLEAN
│ auto_reschedule │ BOOLEAN
│ focus_efficiency│ DECIMAL(3,2)
│ updated_at      │ TIMESTAMP
└─────────────────┘
```

#### SQL 스키마
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- We'll reference auth.users

-- User Goals
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_rate INTEGER NOT NULL CHECK (current_rate >= 0),
  target_rate INTEGER NOT NULL CHECK (target_rate >= current_rate),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Todos
CREATE TYPE todo_status AS ENUM ('pending', 'running', 'completed', 'abandoned');

CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  time INTEGER NOT NULL CHECK (time > 0),  -- minutes
  status todo_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  profit INTEGER DEFAULT 0,
  loss INTEGER DEFAULT 0,
  INDEX idx_user_status (user_id, status),
  INDEX idx_created_at (created_at DESC)
);

-- Ideas
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted_to_todo_id UUID REFERENCES todos(id) ON DELETE SET NULL,
  INDEX idx_user_created (user_id, created_at DESC)
);

-- User Stats
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_profit INTEGER DEFAULT 0,
  total_loss INTEGER DEFAULT 0,
  success_days INTEGER DEFAULT 0,
  fail_days INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  this_week_tasks INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Daily History
CREATE TABLE daily_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  profit INTEGER DEFAULT 0,
  loss INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  tasks_abandoned INTEGER DEFAULT 0,
  focus_time INTEGER DEFAULT 0,  -- minutes
  UNIQUE(user_id, date),
  INDEX idx_user_date (user_id, date DESC)
);

-- User Settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  show_loss BOOLEAN DEFAULT true,
  site_warning BOOLEAN DEFAULT true,
  notifications BOOLEAN DEFAULT true,
  sound BOOLEAN DEFAULT true,
  motivation_banner BOOLEAN DEFAULT true,
  auto_reschedule BOOLEAN DEFAULT false,
  focus_efficiency DECIMAL(3,2) DEFAULT 0.70 CHECK (focus_efficiency BETWEEN 0.50 AND 1.00),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Row Level Security (RLS)
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own goals" ON user_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON user_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON user_goals FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own todos" ON todos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own todos" ON todos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own todos" ON todos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own todos" ON todos FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 5. API 설계

### 5.1 현재 API (v1.0)
없음 - 모든 데이터는 localStorage에서 직접 읽기/쓰기

### 5.2 목표 API (v2.0 - Next.js API Routes + Supabase)

#### REST API Endpoints

##### Goals API
```typescript
// GET /api/goals - 목표 조회
// Response: { currentRate: number, targetRate: number }

// POST /api/goals - 목표 생성/수정
// Request: { currentRate: number, targetRate: number }
// Response: { success: boolean, data: Goals }

// PATCH /api/goals - 목표 수정
// Request: { currentRate?: number, targetRate?: number }
// Response: { success: boolean, data: Goals }
```

##### Todos API
```typescript
// GET /api/todos - 할일 목록 조회
// Query: ?status=pending&limit=20&offset=0
// Response: { todos: Todo[], total: number }

// POST /api/todos - 할일 생성
// Request: { title: string, time: number }
// Response: { success: boolean, data: Todo }

// PATCH /api/todos/:id - 할일 수정
// Request: { title?: string, time?: number, status?: TodoStatus }
// Response: { success: boolean, data: Todo }

// DELETE /api/todos/:id - 할일 삭제
// Response: { success: boolean }

// POST /api/todos/:id/start - 타이머 시작
// Response: { success: boolean, startedAt: string }

// POST /api/todos/:id/complete - 작업 완료
// Request: { timeSpent: number }
// Response: { success: boolean, profit: number }

// POST /api/todos/:id/abandon - 작업 포기
// Request: { timeSpent: number }
// Response: { success: boolean, loss: number }
```

##### Ideas API
```typescript
// GET /api/ideas - 아이디어 목록 조회
// Response: { ideas: Idea[] }

// POST /api/ideas - 아이디어 생성
// Request: { content: string }
// Response: { success: boolean, data: Idea }

// DELETE /api/ideas/:id - 아이디어 삭제
// Response: { success: boolean }

// POST /api/ideas/:id/convert - 아이디어 → 할일 전환
// Request: { time: number }
// Response: { success: boolean, todo: Todo }
```

##### Stats API
```typescript
// GET /api/stats - 통계 조회
// Response: { stats: UserStats }

// GET /api/stats/history - 히스토리 조회
// Query: ?from=2025-01-01&to=2025-01-31
// Response: { history: DailyHistory[] }

// POST /api/stats/update - 통계 업데이트 (내부 API)
// Request: { profit?: number, loss?: number, ... }
// Response: { success: boolean }
```

##### Settings API
```typescript
// GET /api/settings - 설정 조회
// Response: { settings: UserSettings }

// PATCH /api/settings - 설정 수정
// Request: Partial<UserSettings>
// Response: { success: boolean, data: UserSettings }
```

#### Realtime Subscriptions (Supabase)
```typescript
// 실시간 구독 예시
const subscription = supabase
  .channel('todos-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'todos',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Todo changed:', payload);
      // UI 업데이트
    }
  )
  .subscribe();
```

---

## 6. 프론트엔드 설계

### 6.1 컴포넌트 설계

#### 컴포넌트 트리
```
App (layout.tsx)
├── Header
│   ├── Logo
│   ├── StatsPreview (순수익, 연속 성공)
│   └── UserMenu
│       ├── Settings
│       └── Logout
├── Navigation
│   ├── NavItem (목표)
│   ├── NavItem (할 일)
│   ├── NavItem (타이머)
│   └── NavItem (아이디어)
└── Main
    ├── GoalSetupPage
    │   ├── GoalForm
    │   ├── ConversionDisplay
    │   └── ActionButton
    ├── DashboardPage
    │   ├── GoalCard
    │   ├── ProgressCircle
    │   ├── DailyMission
    │   └── MotivationBanner
    ├── TodosPage
    │   ├── TodoList
    │   │   └── TodoItem
    │   │       ├── TodoCard
    │   │       ├── TodoActions
    │   │       └── TimerButton
    │   └── TodoForm
    │       ├── TitleInput
    │       ├── TimeSlider
    │       └── ProfitPreview
    ├── TimerPage
    │   ├── TimerDisplay
    │   ├── ProgressBar
    │   ├── TimerControls
    │   │   ├── PlayButton
    │   │   ├── PauseButton
    │   │   └── StopButton
    │   └── CompletionActions
    │       ├── CompleteButton
    │       └── AbandonButton
    ├── IdeasPage
    │   ├── IdeaList
    │   │   └── IdeaItem
    │   └── IdeaForm
    └── StatsPage
        ├── StatsOverview
        ├── RevenueChart
        ├── StreakChart
        └── HistoryTable
```

#### 주요 컴포넌트 구현 예시

##### TodoItem.tsx
```typescript
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Check, X, Edit, Trash } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useTodos } from '@/hooks/use-todos';
import type { Todo } from '@/types/app.types';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { startTodo, updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);

  const expectedProfit = (todo.time / 60) * todo.currentRate * 0.7;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      {isEditing ? (
        <TodoEditForm todo={todo} onSave={() => setIsEditing(false)} />
      ) : (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{todo.title}</h3>
              <p className="text-sm text-muted-foreground">
                {todo.time}분 · 예상 수익 {formatCurrency(expectedProfit)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => startTodo(todo.id)}
            disabled={todo.status !== 'pending'}
          >
            <Play className="mr-2 h-4 w-4" />
            시작
          </Button>
        </div>
      )}
    </Card>
  );
}
```

##### TimerDisplay.tsx
```typescript
'use client';

import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { useTimer } from '@/hooks/use-timer';
import { formatTime } from '@/lib/utils';

export function TimerDisplay() {
  const { timeLeft, totalTime, isRunning, tick } = useTimer();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl font-bold font-mono">
          {formatTime(timeLeft)}
        </div>
        <p className="text-muted-foreground mt-2">
          남은 시간
        </p>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="text-center text-sm text-muted-foreground">
        {formatTime(totalTime - timeLeft)} / {formatTime(totalTime)}
      </div>
    </div>
  );
}
```

### 6.2 상태 관리

#### Zustand 스토어 예시
```typescript
// stores/timer-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  totalTime: number;
  currentTask: string | null;

  start: (taskId: string, time: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      isPaused: false,
      timeLeft: 0,
      totalTime: 0,
      currentTask: null,

      start: (taskId, time) => {
        set({
          isRunning: true,
          isPaused: false,
          timeLeft: time * 60,
          totalTime: time * 60,
          currentTask: taskId,
        });
      },

      pause: () => {
        set({ isPaused: true });
      },

      resume: () => {
        set({ isPaused: false });
      },

      stop: () => {
        set({
          isRunning: false,
          isPaused: false,
          timeLeft: 0,
          totalTime: 0,
          currentTask: null,
        });
      },

      tick: () => {
        const { timeLeft, isPaused } = get();
        if (isPaused || timeLeft <= 0) return;

        set({ timeLeft: timeLeft - 1 });

        if (timeLeft - 1 === 0) {
          // 타이머 종료 처리
          // 알림, 사운드 등
        }
      },
    }),
    {
      name: 'timer-storage',
    }
  )
);
```

#### TanStack Query 사용 예시
```typescript
// hooks/use-todos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Todo } from '@/types/app.types';

export function useTodos() {
  const queryClient = useQueryClient();

  // 조회
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Todo[];
    },
  });

  // 생성
  const createMutation = useMutation({
    mutationFn: async (newTodo: Omit<Todo, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('todos')
        .insert(newTodo)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Todo> }) => {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    createTodo: createMutation.mutate,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
}
```

---

## 7. 백엔드 설계

### 7.1 Supabase Edge Functions

#### 예시: 통계 업데이트 함수
```typescript
// supabase/functions/update-stats/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    const { userId, profit, loss, taskCompleted } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // 1. user_stats 업데이트
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (statsError) throw statsError;

    const updates = {
      total_profit: stats.total_profit + (profit || 0),
      total_loss: stats.total_loss + (loss || 0),
      total_tasks: stats.total_tasks + (taskCompleted ? 1 : 0),
      this_week_tasks: stats.this_week_tasks + (taskCompleted ? 1 : 0),
      last_active_date: new Date().toISOString().split('T')[0],
    };

    // 연속 성공 계산
    if (taskCompleted) {
      const lastDate = new Date(stats.last_active_date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        // 연속
        updates.current_streak = stats.current_streak + 1;
        updates.longest_streak = Math.max(stats.longest_streak, updates.current_streak);
      } else if (daysDiff > 1) {
        // 끊김
        updates.current_streak = 1;
      }
    }

    await supabase
      .from('user_stats')
      .update(updates)
      .eq('user_id', userId);

    // 2. daily_history 업데이트
    const today = new Date().toISOString().split('T')[0];
    const { data: history } = await supabase
      .from('daily_history')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (history) {
      // 업데이트
      await supabase
        .from('daily_history')
        .update({
          profit: history.profit + (profit || 0),
          loss: history.loss + (loss || 0),
          tasks_completed: history.tasks_completed + (taskCompleted ? 1 : 0),
        })
        .eq('user_id', userId)
        .eq('date', today);
    } else {
      // 생성
      await supabase.from('daily_history').insert({
        user_id: userId,
        date: today,
        profit: profit || 0,
        loss: loss || 0,
        tasks_completed: taskCompleted ? 1 : 0,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

---

## 8. 데이터베이스 설계

### 8.1 인덱스 전략
```sql
-- 자주 조회되는 컬럼에 인덱스
CREATE INDEX idx_todos_user_status ON todos(user_id, status);
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);
CREATE INDEX idx_ideas_user_created ON ideas(user_id, created_at DESC);
CREATE INDEX idx_daily_history_user_date ON daily_history(user_id, date DESC);

-- Full-text search (나중에 추가)
CREATE INDEX idx_todos_title_fts ON todos USING GIN(to_tsvector('korean', title));
```

### 8.2 백업 & 복구
- **자동 백업**: Supabase 자동 백업 (매일)
- **Point-in-Time Recovery**: 7일 보관
- **수동 백업**: pg_dump로 주간 백업

---

## 9. 보안 & 인증

### 9.1 인증 플로우
```typescript
// 1. 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
});

// 2. 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password',
});

// 3. 소셜 로그인
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});

// 4. 로그아웃
await supabase.auth.signOut();
```

### 9.2 Row Level Security (RLS)
모든 테이블에 RLS 적용:
- 사용자는 자신의 데이터만 읽기/쓰기 가능
- `auth.uid() = user_id` 조건으로 필터링

### 9.3 환경 변수
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # 서버 사이드만
```

---

## 10. 성능 최적화

### 10.1 프론트엔드 최적화
- **Code Splitting**: Next.js 자동 코드 스플리팅
- **Image Optimization**: Next.js Image 컴포넌트
- **Font Optimization**: next/font
- **Static Generation**: 가능한 페이지는 SSG
- **Lazy Loading**: React.lazy + Suspense

### 10.2 캐싱 전략
```typescript
// TanStack Query 캐싱
{
  staleTime: 5 * 60 * 1000,  // 5분
  cacheTime: 10 * 60 * 1000, // 10분
  refetchOnWindowFocus: false,
}

// Next.js API 캐싱
export const revalidate = 60; // 60초마다 재검증
```

### 10.3 번들 사이즈 최적화
- Tree-shaking 활용
- Dynamic imports
- 불필요한 라이브러리 제거
- 목표: 초기 번들 < 200KB

---

## 11. 배포 & 인프라

### 11.1 배포 플로우
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 11.2 환경 구성
- **Development**: localhost:3000
- **Staging**: staging.billionairetimer.app
- **Production**: billionairetimer.app

---

## 12. 모니터링 & 로깅

### 12.1 모니터링
- **Vercel Analytics**: 페이지 뷰, 성능
- **Supabase Dashboard**: 데이터베이스 쿼리 성능
- **Sentry**: 에러 추적 (선택)

### 12.2 로깅
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${message}`, meta);
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
    // Sentry.captureException(error);
  },
};
```

---

## 13. 테스트 전략

### 13.1 단위 테스트 (Vitest)
```typescript
// tests/unit/calculations.test.ts
import { describe, it, expect } from 'vitest';
import { calculateProfit } from '@/lib/calculations';

describe('calculateProfit', () => {
  it('should calculate profit correctly', () => {
    const profit = calculateProfit(60, 50000, 0.7);
    expect(profit).toBe(35000);
  });
});
```

### 13.2 E2E 테스트 (Playwright)
```typescript
// tests/e2e/todo.spec.ts
import { test, expect } from '@playwright/test';

test('should create a new todo', async ({ page }) => {
  await page.goto('/todos');
  await page.click('[data-testid="add-todo"]');
  await page.fill('[data-testid="todo-title"]', '테스트 할일');
  await page.fill('[data-testid="todo-time"]', '30');
  await page.click('[data-testid="save-todo"]');

  await expect(page.locator('text=테스트 할일')).toBeVisible();
});
```

---

## 14. 마이그레이션 계획

### 14.1 Phase 1: 준비 (2주)
- [ ] Next.js 프로젝트 세팅
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 마이그레이션
- [ ] 디자인 시스템 구축 (shadcn/ui)

### 14.2 Phase 2: 핵심 기능 (4주)
- [ ] 사용자 인증
- [ ] 목표 설정
- [ ] 할일 관리
- [ ] 타이머 기능
- [ ] 수익/손실 추적

### 14.3 Phase 3: 고급 기능 (2주)
- [ ] 통계 대시보드
- [ ] 성과 보고서
- [ ] 아이디어 뱅크
- [ ] 설정 관리

### 14.4 Phase 4: 테스트 & 배포 (2주)
- [ ] 단위 테스트 작성
- [ ] E2E 테스트 작성
- [ ] 성능 최적화
- [ ] Vercel 배포
- [ ] 사용자 데이터 마이그레이션 스크립트

### 14.5 데이터 마이그레이션 스크립트
```typescript
// scripts/migrate-localStorage-to-supabase.ts
async function migrateUserData(oldData: AppData, userId: string) {
  // 1. Goals
  await supabase.from('user_goals').insert({
    user_id: userId,
    current_rate: oldData.goals.currentRate,
    target_rate: oldData.goals.targetRate,
  });

  // 2. Todos
  const todos = oldData.todos.map(todo => ({
    user_id: userId,
    title: todo.title,
    time: todo.time,
    status: todo.status,
    created_at: todo.createdAt,
  }));
  await supabase.from('todos').insert(todos);

  // 3. Ideas
  // 4. Stats
  // 5. Settings
  // ...
}
```

---

## 부록

### A. 기술 의사결정 기록 (ADR)

#### ADR-001: Next.js 선택
- **결정**: Next.js 15 (App Router) 사용
- **이유**:
  - SSR/SSG 지원
  - 우수한 DX
  - Vercel 통합
  - 대규모 커뮤니티
- **대안**: Remix, Astro
- **결과**: TBD

#### ADR-002: Supabase 선택
- **결정**: Supabase 사용
- **이유**:
  - PostgreSQL 기반
  - Realtime 지원
  - 무료 티어 제공
  - 빠른 프로토타이핑
- **대안**: Firebase, AWS Amplify
- **결과**: TBD

### B. 참고 자료
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)

### C. 변경 이력
| 버전 | 날짜 | 변경 사항 |
|------|------|----------|
| 1.0 | 2025-09-01 | 초기 문서 작성 |
| 2.0 | 2025-10-30 | Next.js + Supabase 스택 추가 |

---

**문서 승인**:
- [ ] Tech Lead
- [ ] Backend Engineer
- [ ] Frontend Engineer
- [ ] DevOps Engineer
