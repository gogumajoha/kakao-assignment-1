// Server Component: 생성 폼 페이지. 폼 자체(인터랙션/HTTP 요청)는 Client Component(TodoForm)가 담당해요.

import TodoForm from "../_components/TodoForm";

export default function NewTodoPage() {
  // 서버 렌더 시점의 오늘 날짜를 기본값으로
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold">새 할 일</h1>
      <TodoForm mode="create" defaultValues={{ date: today }} />
    </main>
  );
}
