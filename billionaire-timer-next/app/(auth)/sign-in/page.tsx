"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Github } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
      <Card className="w-full max-w-md border border-neutral-200 shadow-lg">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>집중 세션을 기록하고 수익을 추적하려면 로그인하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input type="email" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
            <Button className="w-full">이메일로 로그인</Button>
          </div>
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub로 계속하기
          </Button>
          <p className="text-center text-sm text-neutral-500">
            처음 오셨나요?{" "}
            <Link href="/sign-up" className="text-primary underline underline-offset-4">
              회원가입
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
