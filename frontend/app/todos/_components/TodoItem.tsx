"use client";

// Client Component: 인터랙션(완료 토글, 삭제)을 담당해요.
// 데이터 변경은 fetch('/api/todos/{id}') -> route.ts(프록시) -> FastAPI 흐름으로 보냅니다.
// 변경 후 router.refresh()로 Server Component(목록)를 다시 불러와 최신 상태를 반영해요.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Todo } from "@/app/lib/api";
import { API_URL } from "@/app/lib/config";

export default function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    setPending(true);
    try {
      const res = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("상태 변경에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete() {
    if (!confirm("이 할 일을 삭제할까요?")) return;
    setPending(true);
    try {
      const res = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("삭제에 실패했습니다.");
      setPending(false);
    }
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={pending}
        className="size-5 cursor-pointer accent-yellow-500"
        aria-label="완료 토글"
      />

      <div className="flex-1">
        <p
          className={
            todo.completed
              ? "text-zinc-400 line-through"
              : "text-zinc-900 dark:text-zinc-100"
          }
        >
          {todo.text}
        </p>
        <p className="text-xs text-zinc-400">{todo.date}</p>
      </div>

      <Link
        href={`/todos/${todo.id}`}
        className="rounded-md px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        수정
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
      >
        삭제
      </button>
    </li>
  );
}
