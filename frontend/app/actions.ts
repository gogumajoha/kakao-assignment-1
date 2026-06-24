"use server";

// Server Actions (서버 함수): 페이지(Server Component)에서 import 해서 직접 호출해요.
// 여기서는 "데이터 조회(read)"를 담당하며 FastAPI를 직접 호출합니다.
//   - getTodos: 목록 조회 (todos/page.tsx 에서 사용)
//   - getTodo : 단일 조회 (todos/[todoId]/page.tsx 에서 사용)
//
// 반면 "생성/수정/삭제(write)"는 클라이언트에서 fetch('/api/...') -> route.ts(프록시)
// -> FastAPI 흐름으로 처리해요. (역할 분리)
//
// 주의: "use server" 파일은 async 함수만 export 할 수 있어 BACKEND_URL/타입은 lib/api.ts에 둬요.

import { BACKEND_URL } from "./lib/api";
import type { Todo } from "./lib/api";

// 전체 Todo 목록 조회 (GET /todos)
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BACKEND_URL}/todos`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("할 일 목록을 불러오지 못했습니다.");
  }
  return res.json();
}

// 단일 Todo 조회 (GET /todos/{id}) - 수정 페이지에서 사용
export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BACKEND_URL}/todos/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("할 일을 불러오지 못했습니다.");
  }
  return res.json();
}
