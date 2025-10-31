"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsSnapshot } from "@/lib/types";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function StatsDashboard({ stats }: { stats: StatsSnapshot }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>주간 수익 추이</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.revenueSeries}>
              <defs>
                <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₩${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="profit" stroke="#d4af37" fill="url(#profit)" />
              <Area type="monotone" dataKey="loss" stroke="#ef4444" strokeDasharray="4 4" fill="rgba(239,68,68,0.1)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {stats.productivity.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle className="text-base">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-neutral-900">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>성공률</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neutral-900">{Math.round(stats.successRate * 100)}%</p>
            <p className="text-sm text-neutral-500">집중 세션 성공 비율</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>집중 점수</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neutral-900">{Math.round(stats.focusScore * 100)}점</p>
            <p className="text-sm text-neutral-500">집중 지수 (AI 추정)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
