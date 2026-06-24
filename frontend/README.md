# Frontend — Next.js Todo Planner

Next.js 16 App Router 기반 프론트엔드. FastAPI 백엔드와 연동해 Todo를 관리해요.

## 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

> 백엔드(FastAPI)가 `http://localhost:8000`에서 함께 실행 중이어야 해요. ([../backend/README.md](../backend/README.md))

## 환경변수 (`.env.local`)

| 변수 | 노출 범위 | 설명 |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | 브라우저 O | 클라이언트가 호출하는 API Route 주소 (`http://localhost:3000/api`) |
| `BACKEND_URL` | 서버 전용 | 서버(actions/route)가 호출하는 FastAPI 주소 (`http://localhost:8000`) |

`NEXT_PUBLIC_` 접두사가 있어야 브라우저 번들에 포함돼요. `BACKEND_URL`은 접두사가 없어 서버에만 존재하며, 클라이언트 번들에 노출되지 않아요.

## 디렉토리

```
app/
├── api/todos/
│   ├── route.ts              # 프록시: GET(목록)·POST(생성)
│   └── [todoId]/route.ts     # 프록시: PUT(수정)·DELETE(삭제)
├── todos/
│   ├── _components/
│   │   ├── TodoForm.tsx      # (Client) 생성/수정 공용 폼
│   │   └── TodoItem.tsx      # (Client) 토글/삭제 인터랙션
│   ├── [todoId]/page.tsx     # (Server) 수정 페이지
│   ├── new/page.tsx          # (Server) 생성 페이지
│   ├── error.tsx             # 에러 화면
│   ├── loading.tsx           # 로딩 스켈레톤
│   └── page.tsx              # (Server) 목록 페이지
├── lib/
│   ├── api.ts                # Todo 타입 + BACKEND_URL(서버 전용)
│   └── config.ts             # API_URL(클라이언트용)
├── actions.ts                # Server Actions: 조회(read)
├── layout.tsx
└── page.tsx                  # / → /todos 리다이렉트
```

## Server / Client Component 구분

- **Server Component** (page.tsx 들): 서버에서 데이터를 fetch해 렌더링만 — 빠르고 안전.
- **Client Component** (TodoForm/TodoItem): 클릭·입력 등 인터랙션과 HTTP 요청 담당.
