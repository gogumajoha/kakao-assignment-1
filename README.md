# Todo Planner — Next.js + FastAPI

카카오 테크 캠퍼스 3차 과제. 2차 과제의 localStorage 기반 Todo 앱을
**Next.js(App Router) 프론트엔드 + FastAPI 백엔드**로 분리하고, 데이터를 서버 DB에 영속화한 프로젝트예요.

## 구조

```
과제3/
├── frontend/   # Next.js 16 (App Router, TypeScript, Tailwind)
└── backend/    # FastAPI + SQLAlchemy + SQLite
```

자세한 실행법은 각 디렉토리의 README를 참고하세요.
- [frontend/README.md](./frontend/README.md)
- [backend/README.md](./backend/README.md)

## 기능

| 기능 | 설명 |
|---|---|
| 목록 조회 | `/todos`에서 전체 Todo 표시 (Server Component가 서버에서 fetch) |
| 생성 | `/todos/new`에서 내용·날짜 입력해 추가 |
| 수정 | `/todos/[id]`에서 기존 값 수정 |
| 완료 토글 | 목록의 체크박스로 완료/미완료 전환 |
| 삭제 | 목록의 삭제 버튼 (확인 후 제거) |
| 빈 상태 | 할 일이 없을 때 안내 문구 표시 |
| 로딩/에러 | `loading.tsx` 스켈레톤, `error.tsx` 에러 화면 + 재시도 |

## 아키텍처 — 요청 흐름

- **조회(read)**: `Server Component → app/actions.ts → FastAPI` (서버에서 직접 호출)
- **생성·수정·삭제(write)**: `Client Component → fetch('/api/...') → app/api/.../route.ts(프록시) → FastAPI`

`route.ts` 프록시를 두는 이유: 브라우저에 백엔드 주소를 노출하지 않고, CORS·인증·검증을 서버 한 곳에서 처리하기 위해서예요.

## 빠른 실행

```bash
# 터미널 1 — 백엔드
cd backend && python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt
./.venv/bin/uvicorn main:app --reload --port 8000

# 터미널 2 — 프론트엔드
cd frontend && npm install && npm run dev   # http://localhost:3000
```

## 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend**: FastAPI, SQLAlchemy 2.0, Pydantic v2, SQLite
