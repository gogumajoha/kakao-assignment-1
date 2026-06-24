"use client";

// Client Component: 생성/수정 페이지가 공유하는 입력 폼.
// 제출 시 fetch로 route.ts(프록시)를 호출해요.
//   - 생성: POST /api/todos
//   - 수정: PUT  /api/todos/{id}
// 성공하면 목록으로 이동(router.push) 후 router.refresh()로 최신 데이터를 반영해요.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/app/lib/config";

type Props = {
  mode: "create" | "edit";
  defaultValues?: { id?: number; text?: string; date?: string };
};

export default function TodoForm({ mode, defaultValues }: Props) {
  const router = useRouter();
  const [text, setText] = useState(defaultValues?.text ?? "");
  const [date, setDate] = useState(defaultValues?.date ?? "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError("할 일 내용을 입력하세요.");
      return;
    }
    setPending(true);
    setError(null);

    try {
      const url =
        mode === "create"
          ? `${API_URL}/todos`
          : `${API_URL}/todos/${defaultValues?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), date }),
      });
      if (!res.ok) throw new Error();

      router.push("/todos");
      router.refresh();
    } catch {
      setError("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-zinc-600 dark:text-zinc-300">할 일 내용</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          autoFocus
          placeholder="무엇을 해야 하나요?"
          className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-zinc-600 dark:text-zinc-300">날짜</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-zinc-900 hover:bg-yellow-300 disabled:opacity-60"
        >
          {pending ? "처리 중…" : mode === "create" ? "생성" : "저장"}
        </button>
        <Link
          href="/todos"
          className="rounded-md px-4 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
