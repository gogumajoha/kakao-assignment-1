// API Route (백엔드 프록시) — /api/todos
// 클라이언트는 FastAPI 주소를 모른 채 같은 도메인의 /api/todos 로 요청하고,
// 이 핸들러가 서버 측에서 FastAPI(BACKEND_URL)로 중계해요.
//   - GET  : 목록 조회 프록시
//   - POST : 생성 프록시 (TodoForm 의 생성 요청이 여기로 옴)

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/app/lib/api";

// GET /api/todos -> GET {BACKEND_URL}/todos
export async function GET() {
  const res = await fetch(`${BACKEND_URL}/todos`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// POST /api/todos -> POST {BACKEND_URL}/todos
export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
