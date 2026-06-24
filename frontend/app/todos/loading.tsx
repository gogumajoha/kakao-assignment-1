// 데이터 로딩 중 자동으로 보여지는 화면 (Suspense fallback).
// 목록 페이지의 데이터 fetch가 끝날 때까지 스켈레톤을 표시해요.

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-8 h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
          />
        ))}
      </ul>
    </main>
  );
}
