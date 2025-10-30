"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfitSnapshot } from "@/lib/types";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProfitOverview({ profit }: { profit: ProfitSnapshot }) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>주간 수익 현황</CardTitle>
        <p className="text-sm text-neutral-500">
          이번 주 예상 수익 ₩{profit.weekProfit.toLocaleString()} / 손실 ₩{profit.weekLoss.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profit.chart} barCategoryGap={24}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₩${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => `₩${value.toLocaleString()}`}
              labelFormatter={(label) => `${label}요일`}
              cursor={{ fill: "rgba(212, 175, 55, 0.08)" }}
            />
            <Bar dataKey="profit" fill="#d4af37" radius={[8, 8, 0, 0]} />
            <Bar dataKey="loss" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
