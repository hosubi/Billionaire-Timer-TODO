import { IdeaBank } from "@/components/ideas/idea-bank";
import { mockIdeas } from "@/lib/mock-data";

export default function IdeasPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">아이디어 뱅크</h1>
        <p className="text-neutral-500">즉시 떠오르는 아이디어를 캡처하고 실행 가능한 태스크로 전환하세요.</p>
      </header>
      <IdeaBank ideas={mockIdeas} />
    </section>
  );
}
