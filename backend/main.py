import os

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel
from dotenv import load_dotenv

# .env.local 의 환경변수를 불러와요 (DATABASE_URL, FRONTEND_ORIGIN 등)
load_dotenv(".env.local")

# ----------------------------------------------------------------------------
# DB 설정 (환경변수에서 읽고, 없으면 기본값 사용)
# ----------------------------------------------------------------------------
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ----------------------------------------------------------------------------
# DB 모델 (테이블 구조 정의)
# ----------------------------------------------------------------------------
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    date = Column(String, nullable=False)  # "YYYY-MM-DD"


# ----------------------------------------------------------------------------
# Pydantic 스키마 (요청/응답 데이터 구조 정의)
# ----------------------------------------------------------------------------
class TodoCreate(BaseModel):
    """생성 시 필요한 필드"""
    text: str
    date: str
    completed: bool = False


class TodoUpdate(BaseModel):
    """수정 시 필요한 필드 (모두 선택적)"""
    text: str | None = None
    date: str | None = None
    completed: bool | None = None


class TodoResponse(BaseModel):
    """응답 데이터 구조"""
    id: int
    text: str
    date: str
    completed: bool

    class Config:
        from_attributes = True  # ORM 객체 -> 스키마 변환 허용


# ----------------------------------------------------------------------------
# 테이블 생성
# ----------------------------------------------------------------------------
Base.metadata.create_all(bind=engine)


# ----------------------------------------------------------------------------
# FastAPI 앱 생성 + CORS 설정
# ----------------------------------------------------------------------------
app = FastAPI(title="Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------------------------------------------------------
# DB 세션 의존성
# ----------------------------------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------------------------------------------------------------------------
# 엔드포인트 구현
# ----------------------------------------------------------------------------
@app.get("/todos", response_model=list[TodoResponse])
def list_todos(db: Session = Depends(get_db)):
    """전체 Todo 목록 조회"""
    return db.query(Todo).order_by(Todo.id).all()


@app.post("/todos", response_model=TodoResponse, status_code=201)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    """새 Todo 생성"""
    todo = Todo(text=payload.text, date=payload.date, completed=payload.completed)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@app.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """단일 Todo 조회 (수정 페이지에서 사용)"""
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, payload: TodoUpdate, db: Session = Depends(get_db)):
    """Todo 수정 (전달된 필드만 갱신)"""
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(todo, key, value)

    db.commit()
    db.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Todo 삭제"""
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(todo)
    db.commit()
    return None
