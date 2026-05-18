아래 규칙은 Ch10(게시글 CRUD) 작업을 시작하기 전에 Copilot이 따라야 할 프로젝트 기준이다.

- 교재 기준 패키지(Ch7·Ch8):
	- `next`: 16.2.1
	- `@supabase/supabase-js`: 2.47.12
	- `@supabase/ssr`: 0.5.2
- 현재 설치된 패키지(프로젝트 `package.json`):
	- `next`: 16.2.1
	- `@supabase/supabase-js`: 2.105.4
	- `@supabase/ssr`: 0.10.3

규칙 요약:
- Ch7·Ch8 교재 기준을 우선으로 삼되, 실제 `package.json`이 더 최신이면 삭제하지 말고 "교재 기준"과 "현재 설치 기준"을 함께 참고하라.
- Supabase 클라이언트는 반드시 `lib/supabase/client.ts`를 사용하라.
- 인증 상태는 `useAuth()`/`AuthProvider` 패턴을 사용하라 (`components/AuthProvider.tsx` 존재).
- `posts` 테이블의 컬럼명은 Ch8 스키마( `id`, `user_id`, `title`, `content`, `created_at`)를 변경하지 말라.
- App Router만 사용하라. `next/router` 사용 금지(대신 `next/navigation`).
- 수정/삭제 버튼은 UX 차원에서만 제어한다. 실제 권한·보안(행 수준 보안, RLS)은 Ch11에서 처리됨.

체크리스트(작업 전 반드시 확인):
- `lib/supabase/client.ts` 파일이 있고 환경변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 설명이 포함되어 있는가?
- `components/AuthProvider.tsx`와 `useAuth()` 훅이 앱 전체에 연결되어 있는가?(`app/layout.tsx` 포함)
- `posts` 스키마에 맞춰 쿼리가 작성되는가? (컬럼명 임의 변경 금지)
- App Router 경로 구조(`/posts`, `/posts/[id]`, `/posts/new`)가 프로젝트에 맞춰져 있는가?

더 자세한 정책·문맥은 프로젝트 루트의 `AGENTS.md`, `ARCHITECTURE.md`, `context.md`, `todo.md`를 참조하라.
