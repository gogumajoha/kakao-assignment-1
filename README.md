# Todo Planner (React)

바닐라 JS로 만든 주간 Todo Planner(1차 과제)를 React + Vite로 마이그레이션한 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 구현 기능

- **Todo CRUD**: 입력창 + 추가 버튼으로 생성, 인라인 입력창으로 수정, 완료 토글, 삭제
  - 빈 입력값 제출 시 생성되지 않고 안내 메시지를 표시
  - 완료된 Todo는 취소선으로 시각적 구분
- **상태별 필터링**: 전체 / 진행 중 / 완료 탭으로 원하는 상태만 표시 (현재 탭 강조, 탭 전환 후 추가해도 필터 유지)
- **일간 뷰**: 선택된 날짜를 표시하고 이전/다음 날로 이동, 해당 날짜의 Todo만 표시
- **주간 뷰**: 이번 주 7일을 표시하고 이전/다음 주로 이동, 날짜별 Todo 개수와 오늘/선택일 강조, 날짜 클릭 시 해당 날짜 선택
- **로컬 스토리지 연동**: `useEffect`로 Todo·선택 날짜·선택 주차를 자동 저장하여 새로고침 후에도 유지

## 폴더 구조

```
src/
├─ App.jsx              # 상태 관리(todos/filter/selectedDate/weekStartDate)와 localStorage 연동
├─ App.css              # 앱 스타일
├─ index.css            # 전역 스타일 / CSS 변수
├─ main.jsx             # 진입점
├─ components/
│  ├─ WeekView.jsx      # 주간 캘린더 + 주 이동
│  ├─ DailyView.jsx     # 선택 날짜 표시 + 날짜 이동
│  ├─ TodoInput.jsx     # 입력창 + 추가 + 안내 메시지
│  ├─ FilterTabs.jsx    # 상태 필터 탭
│  ├─ TodoList.jsx      # 목록 렌더링 / 빈 상태 처리
│  └─ TodoItem.jsx      # 항목 1개 (인라인 수정/완료/삭제)
└─ utils/
   └─ date.js           # 날짜 포맷·계산 유틸
```

## 상태 설계

| 상태 | 위치 | 설명 |
|------|------|------|
| `todos` | App | `{ id, text, isCompleted, date }` 배열 (단일 출처) |
| `filter` | App | `all` / `active` / `completed` |
| `selectedDate` | App | 선택된 날짜 (`YYYY-MM-DD`) |
| `weekStartDate` | App | 보고 있는 주의 월요일 (`YYYY-MM-DD`) |
| `text`, `message` | TodoInput | 입력값과 안내 메시지 |
| `isEditing`, `editText` | TodoItem | 수정 모드 여부와 수정 중 임시값 |

공유 데이터는 App에서 관리하고, UI 로컬 상태는 각 컴포넌트가 보유합니다.
