// Server Component: 수정 페이지. 서버에서 단일 Todo를 조회(getTodo)해 기존 값을 폼에 채워요.
// Next.js 16에서 params는 Promise이므로 await로 풀어서 사용합니다.

import { getTodo } from "@/app/actions";
import TodoForm from "../_components/TodoForm";

export default async function EditTodoPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const todo = await getTodo(Number(todoId));

  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold">할 일 수정</h1>
      <TodoForm
        mode="edit"
        defaultValues={{ id: todo.id, text: todo.text, date: todo.date }}
      />
    </main>
  );
}
