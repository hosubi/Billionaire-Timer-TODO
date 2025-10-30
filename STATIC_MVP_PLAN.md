# 정적 MVP 개발 플랜 (Static MVP Plan)
# 천억부자게임 v0.5 (Pre-Auth)

**버전**: v0.5 (정적 버전)
**작성일**: 2025-10-30
**개발 기간**: 2-3주
**목표**: Supabase 연동 전 SEO 트래픽 검증

---

## 📋 목차

1. [전략 개요](#1-전략-개요)
2. [기술 스택](#2-기술-스택)
3. [Phase별 개발 계획](#3-phase별-개발-계획)
4. [페이지 구조](#4-페이지-구조)
5. [디자인 시스템](#5-디자인-시스템)
6. [SEO 전략](#6-seo-전략)
7. [데이터 저장 방식](#7-데이터-저장-방식)
8. [배포 전략](#8-배포-전략)

---

## 1. 전략 개요

### 1.1 개발 철학

```
🎯 Phase 0.5: 정적 MVP (지금)
   └─ localStorage 기반
   └─ SEO 최적화 집중
   └─ 트래픽 검증

📊 트래픽 달성 시 (목표: 1,000+ 방문자/월)
   └─ Phase 1.0: Supabase 연동
   └─ 로그인/회원가입 추가
   └─ 클라우드 동기화

🚀 검증 완료 후
   └─ 게임 기능 본격 개발
   └─ 랭킹, 레벨, 포인트 시스템
```

### 1.2 왜 정적 먼저?

| 이유 | 설명 |
|------|------|
| 💰 **비용 절감** | Supabase 무료 티어 아끼기 |
| ⚡ **빠른 검증** | SEO 효과 빠르게 측정 |
| 🎯 **핵심 집중** | 계산기 품질에 집중 |
| 📈 **데이터 수집** | 어떤 계산기가 인기 있는지 파악 |
| 🔒 **리스크 최소화** | 트래픽 없으면 투자 최소화 |

### 1.3 성공 기준 (Phase 0.5 → 1.0 전환)

```
✅ 자연 유입 1,000+ 방문자/월
✅ 계산기 사용 500+ 회/월
✅ 평균 체류 시간 2분+
✅ 재방문율 20%+

→ 달성 시 Supabase 연동 시작
```

---

## 2. 기술 스택

### 2.1 Frontend (정적 버전)

```typescript
{
  "framework": "Next.js 15 (App Router) + Static Export",
  "language": "TypeScript 5.3+",
  "styling": "Tailwind CSS 3.4+",
  "ui": "shadcn/ui (Yellow/Gold Theme)",
  "animations": "@animate-ui + Framer Motion",
  "icons": "Lucide React",
  "storage": "localStorage + IndexedDB (Dexie.js)",
  "pwa": "next-pwa (Service Worker)"
}
```

### 2.2 배포 & SEO

```typescript
{
  "hosting": "Vercel (Static Export)",
  "domain": "billionairegame.app",
  "analytics": "Google Analytics 4 + Vercel Analytics",
  "seo": {
    "sitemap": "next-sitemap",
    "robots": "자동 생성",
    "structured_data": "JSON-LD"
  }
}
```

### 2.3 제외 항목 (Phase 1.0에서 추가)

```
❌ Supabase
❌ 사용자 인증
❌ 데이터베이스
❌ 실시간 랭킹
❌ 서버 API
```

---

## 3. Phase별 개발 계획

### 📅 Phase 0: 프로젝트 세팅 (Day 1-2)

**목표**: Next.js 프로젝트 초기화 및 기본 설정

#### 작업 목록
```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest billionaire-game-static \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd billionaire-game-static

# 2. shadcn/ui 초기화
npx shadcn@latest init

# 3. 필수 라이브러리 설치
npm install lucide-react framer-motion
npm install dexie dexie-react-hooks
npm install canvas-confetti
npm install date-fns
npm install zustand

# 4. 개발 도구
npm install -D @types/canvas-confetti

# 5. PWA 설정
npm install next-pwa
```

#### 디렉토리 구조
```
billionaire-game-static/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (랜딩)
│   │   ├── calculators/
│   │   │   ├── hourly/page.tsx (시급계산기)
│   │   │   ├── salary/page.tsx (월급계산기)
│   │   │   └── annual/page.tsx (연봉계산기)
│   │   ├── app/
│   │   │   └── page.tsx (메인 앱)
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   ├── calculator/
│   │   ├── todo/
│   │   ├── timer/
│   │   └── ideas/
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── storage.ts (localStorage)
│   │   └── calculations.ts
│   ├── hooks/
│   └── types/
├── public/
│   ├── icons/
│   └── images/
├── next.config.js
├── tailwind.config.ts
└── package.json
```

#### next.config.js (정적 export)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 HTML 생성
  images: {
    unoptimized: true, // 정적 export용
  },
}

module.exports = nextConfig
```

---

### 📅 Phase 1: 디자인 시스템 (Day 3-4)

**목표**: 골드 테마 디자인 시스템 구축

#### 1.1 Tailwind 설정 (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 골드 테마
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // 메인 골드
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // shadcn 기본 컬러 (골드 테마로 커스터마이징)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'coin-flip': 'coin-flip 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

#### 1.2 글로벌 CSS (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 골드 테마 컬러 (라이트 모드) */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --primary: 38 92% 50%; /* 골드 #F59E0B */
    --primary-foreground: 0 0% 100%;

    --secondary: 45 93% 47%; /* 밝은 골드 */
    --secondary-foreground: 240 5.9% 10%;

    --muted: 45 100% 96%;
    --muted-foreground: 45 5% 35%;

    --accent: 38 100% 50%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 45 20% 90%;
    --input: 45 20% 90%;
    --ring: 38 92% 50%;

    --radius: 0.5rem;
  }

  .dark {
    /* 다크 모드 (Phase 2) */
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --primary: 38 92% 50%;
    --primary-foreground: 0 0% 9%;

    --secondary: 45 93% 35%;
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 38 100% 40%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 38 92% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* 커스텀 유틸리티 */
@layer utilities {
  .gold-gradient {
    background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%);
  }

  .gold-shimmer {
    background: linear-gradient(
      90deg,
      #F59E0B 0%,
      #FBBF24 50%,
      #F59E0B 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
  }

  .coin-shadow {
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
  }
}
```

#### 1.3 shadcn/ui 컴포넌트 설치

```bash
# 필수 컴포넌트
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add tabs
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add progress
npx shadcn@latest add slider
npx shadcn@latest add select
npx shadcn@latest add separator
npx shadcn@latest add toast
```

---

### 📅 Phase 2: 연봉계산기 (Day 5-7)

**목표**: SEO 최적화된 3개 계산기 완성

#### 2.1 시급계산기 (`/calculators/hourly`)

```typescript
// src/app/calculators/hourly/page.tsx
import { Metadata } from 'next'
import HourlyCalculator from '@/components/calculator/HourlyCalculator'

export const metadata: Metadata = {
  title: '시급계산기 - 월급, 연봉 자동 계산 | 천억부자게임',
  description: '시급을 입력하면 월급, 연봉, 실수령액을 자동으로 계산해드립니다. 2025년 최저시급 9,860원 기준 정확한 계산.',
  keywords: '시급계산기, 시급, 월급계산, 연봉계산, 최저시급, 급여계산',
  openGraph: {
    title: '시급계산기 - 무료 급여 계산 도구',
    description: '시급으로 월급, 연봉 쉽게 계산하세요',
    url: 'https://billionairegame.app/calculators/hourly',
    siteName: '천억부자게임',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function HourlyCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 gold-gradient bg-clip-text text-transparent">
        💰 시급계산기
      </h1>

      <HourlyCalculator />

      {/* SEO 콘텐츠 */}
      <article className="mt-12 prose prose-lg max-w-3xl mx-auto">
        <h2>시급계산기 사용법</h2>
        <p>
          시급을 입력하면 자동으로 일급, 월급, 연봉을 계산해드립니다.
          2025년 최저시급은 9,860원입니다.
        </p>

        <h3>계산 공식</h3>
        <ul>
          <li>일급 = 시급 × 8시간</li>
          <li>월급 = 시급 × 209시간</li>
          <li>연봉 = 월급 × 12개월</li>
        </ul>

        <h3>자주 묻는 질문</h3>
        <details>
          <summary>2025년 최저시급은 얼마인가요?</summary>
          <p>2025년 최저시급은 시간당 9,860원입니다.</p>
        </details>
      </article>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a
          href="/app"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-bold text-lg coin-shadow transition-all hover:scale-105"
        >
          🎮 이 시급으로 게임하기
        </a>
      </div>
    </div>
  )
}
```

#### 2.2 HourlyCalculator 컴포넌트

```typescript
// src/components/calculator/HourlyCalculator.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator } from 'lucide-react'

export default function HourlyCalculator() {
  const [hourlyWage, setHourlyWage] = useState<number>(9860) // 2025 최저시급

  const dailyWage = hourlyWage * 8
  const monthlyWage = hourlyWage * 209 // 주 52시간 기준
  const annualSalary = monthlyWage * 12

  // 4대보험 공제 (간단 계산)
  const nationalPension = monthlyWage * 0.045 // 국민연금 4.5%
  const healthInsurance = monthlyWage * 0.03545 // 건강보험 3.545%
  const employmentInsurance = monthlyWage * 0.009 // 고용보험 0.9%
  const totalDeduction = nationalPension + healthInsurance + employmentInsurance

  const netMonthlyWage = monthlyWage - totalDeduction

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 입력 카드 */}
      <Card className="border-gold-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-gold-500" />
            시급 입력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hourly-wage">시급 (원)</Label>
              <Input
                id="hourly-wage"
                type="number"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="text-2xl font-bold border-gold-300 focus:border-gold-500"
              />
              <p className="text-sm text-muted-foreground mt-2">
                2025년 최저시급: 9,860원
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 결과 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* 일급 */}
        <Card className="gold-shimmer">
          <CardHeader>
            <CardTitle className="text-lg">일급</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩{formatNumber(dailyWage)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              하루 8시간 기준
            </p>
          </CardContent>
        </Card>

        {/* 월급 */}
        <Card className="gold-shimmer">
          <CardHeader>
            <CardTitle className="text-lg">월급 (세전)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩{formatNumber(monthlyWage)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              월 209시간 기준
            </p>
          </CardContent>
        </Card>

        {/* 월급 실수령액 */}
        <Card className="gold-gradient">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              월급 (실수령)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              ₩{formatNumber(netMonthlyWage)}
            </p>
            <p className="text-sm text-white/80 mt-1">
              4대보험 공제 후 (약 ₩{formatNumber(totalDeduction)} 공제)
            </p>
          </CardContent>
        </Card>

        {/* 연봉 */}
        <Card className="gold-gradient">
          <CardHeader>
            <CardTitle className="text-lg text-white">연봉</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              ₩{formatNumber(annualSalary)}
            </p>
            <p className="text-sm text-white/80 mt-1">
              월급 × 12개월
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4대보험 상세 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">4대보험 공제 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>국민연금 (4.5%)</span>
              <span className="font-semibold">
                ₩{formatNumber(nationalPension)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>건강보험 (3.545%)</span>
              <span className="font-semibold">
                ₩{formatNumber(healthInsurance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>고용보험 (0.9%)</span>
              <span className="font-semibold">
                ₩{formatNumber(employmentInsurance)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>총 공제액</span>
              <span className="text-red-500">
                -₩{formatNumber(totalDeduction)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

#### 2.3 JSON-LD 구조화 데이터

```typescript
// src/app/calculators/hourly/page.tsx에 추가
export default function HourlyCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '시급계산기',
    description: '시급으로 월급, 연봉을 자동 계산하는 무료 도구',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... 기존 JSX */}
    </>
  )
}
```

---

### 📅 Phase 3: 투두리스트 (Day 8-10)

**목표**: localStorage 기반 투두리스트

#### 3.1 데이터 구조

```typescript
// src/types/index.ts
export interface Todo {
  id: string
  title: string
  time: number // 예상 소요 시간 (분)
  difficulty: 'easy' | 'normal' | 'hard'
  status: 'pending' | 'running' | 'completed' | 'abandoned'
  createdAt: string
  startedAt?: string
  completedAt?: string
  points?: number
}

export interface AppData {
  todos: Todo[]
  ideas: Idea[]
  stats: {
    totalPoints: number
    totalCompleted: number
    totalTime: number
    currentStreak: number
    lastActiveDate: string | null
  }
  settings: {
    hourlyWage: number
    notifications: boolean
    sound: boolean
  }
}
```

#### 3.2 localStorage 유틸리티

```typescript
// src/lib/storage.ts
const STORAGE_KEY = 'billionaire_game_data'

export const storage = {
  get: (): AppData | null => {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  },

  set: (data: AppData) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  clear: () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  },
}

// 초기 데이터
export const getInitialData = (): AppData => ({
  todos: [],
  ideas: [],
  stats: {
    totalPoints: 0,
    totalCompleted: 0,
    totalTime: 0,
    currentStreak: 0,
    lastActiveDate: null,
  },
  settings: {
    hourlyWage: 50000, // 기본 시급
    notifications: true,
    sound: true,
  },
})
```

#### 3.3 Zustand 스토어

```typescript
// src/lib/store.ts
import { create } from 'zustand'
import { storage, getInitialData } from './storage'
import type { AppData, Todo } from '@/types'

interface AppStore extends AppData {
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'status'>) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string, timeSpent: number) => void
  hydrate: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  ...getInitialData(),

  hydrate: () => {
    const data = storage.get()
    if (data) {
      set(data)
    }
  },

  addTodo: (todo) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    set((state) => {
      const newState = {
        ...state,
        todos: [...state.todos, newTodo],
      }
      storage.set(newState)
      return newState
    })
  },

  updateTodo: (id, updates) => {
    set((state) => {
      const newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        ),
      }
      storage.set(newState)
      return newState
    })
  },

  deleteTodo: (id) => {
    set((state) => {
      const newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      }
      storage.set(newState)
      return newState
    })
  },

  completeTodo: (id, timeSpent) => {
    const todo = get().todos.find((t) => t.id === id)
    if (!todo) return

    // 포인트 계산
    const basePoints = timeSpent * 10
    const difficultyMultiplier = {
      easy: 1.0,
      normal: 1.2,
      hard: 1.5,
    }[todo.difficulty]
    const points = Math.round(basePoints * difficultyMultiplier)

    set((state) => {
      const newState = {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id
            ? {
                ...t,
                status: 'completed' as const,
                completedAt: new Date().toISOString(),
                points,
              }
            : t
        ),
        stats: {
          ...state.stats,
          totalPoints: state.stats.totalPoints + points,
          totalCompleted: state.stats.totalCompleted + 1,
          totalTime: state.stats.totalTime + timeSpent,
        },
      }
      storage.set(newState)
      return newState
    })
  },
}))
```

#### 3.4 투두 리스트 컴포넌트

```typescript
// src/components/todo/TodoList.tsx
'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Trash2 } from 'lucide-react'

export default function TodoList() {
  const { todos, deleteTodo, hydrate } = useAppStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const pendingTodos = todos.filter((t) => t.status === 'pending')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">할 일 목록</h2>
        <Badge variant="secondary">{pendingTodos.length}개</Badge>
      </div>

      <div className="space-y-3">
        {pendingTodos.map((todo) => (
          <Card key={todo.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{todo.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        todo.difficulty === 'hard'
                          ? 'destructive'
                          : todo.difficulty === 'normal'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {todo.difficulty === 'easy'
                        ? '쉬움'
                        : todo.difficulty === 'normal'
                        ? '보통'
                        : '어려움'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {todo.time}분
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" className="gold-gradient">
                    <Play className="w-4 h-4 mr-1" />
                    시작
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

### 📅 Phase 4: 타이머 (Day 11-12)

**목표**: Service Worker 기반 백그라운드 타이머

#### 4.1 타이머 훅

```typescript
// src/hooks/useTimer.ts
'use client'

import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60) // 초 단위
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // 완료 알림
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('타이머 완료!', {
                body: '작업을 완료했습니다! 🎉',
                icon: '/icons/icon-192.png',
              })
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isPaused])

  const start = () => setIsRunning(true)
  const pause = () => setIsPaused(true)
  const resume = () => setIsPaused(false)
  const stop = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(initialTime * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    formatTime: formatTime(timeLeft),
    progress: ((initialTime * 60 - timeLeft) / (initialTime * 60)) * 100,
  }
}
```

#### 4.2 타이머 컴포넌트

```typescript
// src/components/timer/Timer.tsx
'use client'

import { useTimer } from '@/hooks/useTimer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Square, Check, X } from 'lucide-react'
import confetti from 'canvas-confetti'

interface TimerProps {
  time: number
  title: string
  onComplete: (timeSpent: number) => void
  onAbandon: () => void
}

export default function Timer({ time, title, onComplete, onAbandon }: TimerProps) {
  const { timeLeft, isRunning, isPaused, start, pause, resume, stop, formatTime, progress } =
    useTimer(time)

  const handleComplete = () => {
    const timeSpent = time - Math.floor(timeLeft / 60)

    // 폭죽 효과
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#FCD34D'],
    })

    onComplete(timeSpent)
  }

  return (
    <Card className="max-w-md mx-auto border-gold-500">
      <CardContent className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* 타이머 디스플레이 */}
        <div className="my-8">
          <div className="text-7xl font-bold font-mono gold-gradient bg-clip-text text-transparent">
            {formatTime}
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {!isRunning && (
            <Button onClick={start} size="lg" className="gold-gradient">
              <Play className="w-5 h-5 mr-2" />
              시작
            </Button>
          )}

          {isRunning && !isPaused && (
            <Button onClick={pause} size="lg" variant="secondary">
              <Pause className="w-5 h-5 mr-2" />
              일시정지
            </Button>
          )}

          {isRunning && isPaused && (
            <Button onClick={resume} size="lg" className="gold-gradient">
              <Play className="w-5 h-5 mr-2" />
              재개
            </Button>
          )}

          {isRunning && (
            <Button onClick={stop} size="lg" variant="destructive">
              <Square className="w-5 h-5 mr-2" />
              중단
            </Button>
          )}
        </div>

        {/* 완료 버튼 (타이머 실행 중일 때만) */}
        {isRunning && (
          <div className="flex gap-2">
            <Button onClick={handleComplete} className="flex-1 bg-green-500 hover:bg-green-600">
              <Check className="w-5 h-5 mr-2" />
              완료
            </Button>
            <Button onClick={onAbandon} variant="outline" className="flex-1">
              <X className="w-5 h-5 mr-2" />
              포기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

---

### 📅 Phase 5: 아이디어 탭 (Day 13)

**목표**: 간단한 아이디어 메모 기능

```typescript
// src/components/ideas/IdeaList.tsx
'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lightbulb, Trash2, ArrowRight } from 'lucide-react'

export default function IdeaList() {
  const { ideas, addIdea, deleteIdea } = useAppStore()
  const [newIdea, setNewIdea] = useState('')

  const handleAdd = () => {
    if (newIdea.trim()) {
      addIdea({ content: newIdea })
      setNewIdea('')
    }
  }

  return (
    <div className="space-y-4">
      {/* 입력 */}
      <div className="flex gap-2">
        <Input
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="아이디어를 입력하세요..."
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} className="gold-gradient">
          <Lightbulb className="w-4 h-4" />
        </Button>
      </div>

      {/* 아이디어 목록 */}
      <div className="space-y-2">
        {ideas.map((idea) => (
          <Card key={idea.id}>
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Lightbulb className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="flex-1">{idea.content}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deleteIdea(idea.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 4. SEO 전략

### 4.1 타겟 키워드

| 키워드 | 월 검색량 | 난이도 | 우선순위 |
|--------|----------|--------|----------|
| 연봉계산기 | 127,100 | 중 | P0 |
| 시급계산기 | 54,500 | 중 | P0 |
| 월급계산기 | 31,900 | 중 | P0 |
| 시급 계산 | 12,100 | 낮 | P1 |
| 실수령액 계산 | 8,100 | 낮 | P1 |

### 4.2 sitemap 생성

```bash
npm install next-sitemap
```

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://billionairegame.app',
  generateRobotsTxt: true,
  exclude: ['/app/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/app'],
      },
    ],
  },
}
```

### 4.3 robots.txt

```
# 계산기 페이지는 크롤링 허용
User-agent: *
Allow: /
Allow: /calculators/

# 앱 페이지는 크롤링 제외 (로그인 후)
Disallow: /app/

Sitemap: https://billionairegame.app/sitemap.xml
```

---

## 5. 배포

### 5.1 Vercel 배포

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 로그인
vercel login

# 3. 프로젝트 연결
vercel link

# 4. 배포
vercel --prod
```

### 5.2 환경 변수

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://billionairegame.app
```

---

## 6. 성공 지표 추적

### 6.1 Google Analytics 이벤트

```typescript
// src/lib/analytics.ts
export const trackCalculatorUse = (type: 'hourly' | 'salary' | 'annual') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_use', {
      calculator_type: type,
    })
  }
}

export const trackTodoComplete = (points: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'todo_complete', {
      points,
    })
  }
}
```

### 6.2 추적할 지표

```
✅ 페이지뷰 (전체 / 계산기별)
✅ 계산기 사용 횟수
✅ 평균 체류 시간
✅ 이탈률
✅ "게임하기" 버튼 클릭률
✅ 할일 추가 횟수
✅ 할일 완료율
```

---

## 부록

### A. 체크리스트

```
Phase 0: 프로젝트 세팅
- [ ] Next.js 프로젝트 생성
- [ ] shadcn/ui 설치
- [ ] Tailwind 골드 테마 설정
- [ ] 기본 레이아웃 구성

Phase 1: 계산기
- [ ] 시급계산기 개발
- [ ] 월급계산기 개발
- [ ] 연봉계산기 개발
- [ ] SEO 메타태그
- [ ] JSON-LD 추가

Phase 2: 앱 기능
- [ ] 투두리스트
- [ ] 타이머
- [ ] 아이디어 탭
- [ ] localStorage 저장

Phase 3: 배포
- [ ] Vercel 배포
- [ ] 도메인 연결
- [ ] Google Analytics 연동
- [ ] Search Console 등록
```

### B. 다음 단계 (Phase 1.0)

트래픽 목표 달성 후:
1. Supabase 프로젝트 생성
2. 회원가입/로그인 추가
3. localStorage → Supabase 마이그레이션
4. 실시간 랭킹 구현
5. 게임 메커니즘 본격 개발

---

**문서 승인**:
- [ ] Product Manager
- [ ] Tech Lead
- [ ] SEO Specialist
