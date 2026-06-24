// 프론트엔드 전역에서 공유하는 타입과 설정값.
// - Todo 타입: 클라이언트/서버 어디서든 import (type-only)
// - BACKEND_URL: 서버 쪽(actions.ts, route.ts)에서만 사용하는 FastAPI 주소
//   (NEXT_PUBLIC_ 접두사가 없으므로 브라우저 번들에는 포함되지 않아요)

export type Todo = {
  id: number;
  text: string;
  date: string; // "YYYY-MM-DD"
  completed: boolean;
};

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";
