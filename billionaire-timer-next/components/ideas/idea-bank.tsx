import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { IdeaSnapshot } from "@/lib/types";

const potentialColor: Record<IdeaSnapshot["potential"], "default" | "secondary" | "outline"> = {
  high: "default",
  medium: "secondary",
  low: "outline"
};

export function IdeaBank({ ideas }: { ideas: IdeaSnapshot[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>빠른 아이디어 기록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea rows={6} placeholder="아이디어 또는 통찰을 적어보세요." />
          <div className="flex justify-end gap-2">
            <Button variant="outline">초안 저장</Button>
            <Button>아이디어 등록</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>최근 아이디어</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ideas.map((idea) => (
            <div key={idea.id} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Badge variant={potentialColor[idea.potential]}>잠재력 {idea.potential.toUpperCase()}</Badge>
                <span className="text-xs text-neutral-500">{idea.createdAt}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">{idea.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
