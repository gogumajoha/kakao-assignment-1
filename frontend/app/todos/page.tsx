// Server Component: 데이터를 "불러와서 보여주는" 역할만 담당해요.
// 데이터 조회는 서버에서(getTodos), 인터랙션은 자식 Client Component(TodoItem)가 처리합니다.

import Link from "next/link";
import { getTodos } from "@/app/actions";
import TodoItem from "./_components/TodoItem";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-600">
            kakao tech campus
          </p>
          <h1 className="text-2xl font-bold">Todo Planner</h1>
        </div>
        <Link
          href="/todos/new"
          className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-zinc-900 hover:bg-yellow-300"
        >
          + 새 할 일
        </Link>
      </header>

      {todos.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 py-16 text-center text-zinc-400 dark:border-zinc-700">
          아직 할 일이 없어요. 새 할 일을 추가해보세요!
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </main>
  );
}
