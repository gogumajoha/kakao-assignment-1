// API Route (백엔드 프록시) — /api/todos/[todoId]
// 특정 Todo에 대한 수정/삭제 요청을 FastAPI로 중계해요.
//   - PUT    : 수정/토글 프록시
//   - DELETE : 삭제 프록시
// Next.js 16에서 route handler의 params도 Promise라서 await로 풀어요.

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/app/lib/api";

// PUT /api/todos/{id} -> PUT {BACKEND_URL}/todos/{id}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;
  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// DELETE /api/todos/{id} -> DELETE {BACKEND_URL}/todos/{id}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;
  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "DELETE",
  });
  // FastAPI는 204(No Content)를 반환하므로 본문 없이 상태코드만 전달
  return new NextResponse(null, { status: res.status });
}
