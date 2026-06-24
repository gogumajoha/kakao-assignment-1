"use client";

// 에러 바운더리: 페이지 렌더/데이터 fetch 중 에러가 나면 자동으로 이 화면이 떠요.
// error.tsx는 반드시 Client Component여야 하고, reset()으로 재시도할 수 있어요.

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h2 className="text-xl font-bold text-red-600">문제가 발생했어요</h2>
      <p className="text-zinc-500">
        {error.message || "할 일을 불러오는 중 오류가 발생했습니다."}
      </p>
      <p className="text-sm text-zinc-400">
        백엔드(FastAPI) 서버가 실행 중인지 확인해보세요.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-zinc-900 hover:bg-yellow-300"
      >
        다시 시도
      </button>
    </main>
  );
}
