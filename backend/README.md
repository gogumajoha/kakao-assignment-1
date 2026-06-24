# Backend — FastAPI Todo API

Todo 데이터를 관리하는 REST API. SQLAlchemy로 SQLite(`todos.db`)에 영속화해요.

## 실행

```bash
python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
./.venv/bin/uvicorn main:app --reload --port 8000
```

- 서버: http://localhost:8000
- 자동 문서(Swagger): http://localhost:8000/docs

## 환경변수 (`.env.local`)

| 변수 | 설명 | 기본값 |
|---|---|---|
| `DATABASE_URL` | DB 접속 주소 | `sqlite:///./todos.db` |
| `FRONTEND_ORIGIN` | CORS 허용 origin | `http://localhost:3000` |

## API

| Method | URL | 설명 |
|---|---|---|
| GET | `/todos` | 전체 목록 조회 |
| POST | `/todos` | 생성 (`{ text, date, completed? }`) |
| GET | `/todos/{id}` | 단일 조회 |
| PUT | `/todos/{id}` | 수정 (전달한 필드만 갱신) |
| DELETE | `/todos/{id}` | 삭제 |

## 데이터 모델

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | int | PK (자동 증가) |
| `text` | str | 할 일 내용 |
| `date` | str | 날짜 `"YYYY-MM-DD"` |
| `completed` | bool | 완료 여부 (기본 false) |

- **DB 모델**(`Todo`)과 **요청/응답 스키마**(`TodoCreate`/`TodoUpdate`/`TodoResponse`)를 분리해,
  테이블 구조와 API 입출력 형태를 독립적으로 관리해요.
