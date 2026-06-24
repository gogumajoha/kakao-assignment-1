// 클라이언트에서 사용하는 API Route 베이스 주소.
// NEXT_PUBLIC_ 접두사가 있어 브라우저 번들에 안전하게 포함돼요.
// (서버 전용 BACKEND_URL과 분리해 둬서, 클라이언트 번들에 백엔드 주소가 새지 않아요.)
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
