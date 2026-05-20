# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-09
- 완료된 작업: 기본 앱 구조 (Ch1~6), 홈/포스트 목록 페이지, 기본 레이아웃, 포스트 CRUD (Ch10)
- 진행 중: RLS 설정 (Ch11에서 진행)
- 완료/연결됨: Ch8 Supabase 클라이언트(`lib/supabase/client.ts`), Ch9 인증 `AuthProvider`/`useAuth` 구현, Ch10 게시글 CRUD 완성

## Ch10 구현 요약 (게시글 CRUD)

- **상태:** 구현 완료 및 빌드 테스트 통과
- **생성/수정 주요 파일:**
  - `app/posts/page.tsx` & `app/components/PostsClient.tsx`: 게시글 목록, 검색 필터링
  - `app/posts/[id]/page.tsx`: 게시글 상세 보기 (서버 컴포넌트 데이터 페칭)
  - `app/posts/new/page.tsx`: 게시글 작성 페이지 (클라이언트)
  - `app/components/PostForm.tsx`: 작성 및 수정 공통 폼
  - `app/components/PostActions.tsx`: 작성자 전용 수정 및 삭제 버튼 제공
  - `app/api/posts/route.ts` & `app/api/posts/[id]/route.js`: POST, PATCH, DELETE 처리를 위한 보안 핸들러 (JWT 검증 등)
- **Supabase 쿼리 패턴:**
  - SELECT: `supabase.from('posts').select(...)` 또는 `/rest/v1/posts?select=...` REST API 사용
  - INSERT: `/api/posts` 등에서 JWT 인증 하에 수행
  - UPDATE: `PostActions.tsx` (or API route)에서 `.update(...).eq('id', id)` 처리
  - DELETE: `.delete().eq('id', id)`
- **작성자 UI 분기:** `user?.id === post.user_id`를 판별하여 수정/삭제 폼을 표시합니다. 이는 **UX 처리**이며, **실제 데이터 보안(방어)은 Ch11의 RLS(행 수준 보안)** 에서 이루어집니다.

## 기술 결정 사항

- Next.js App Router (app/ 폴더) 사용 — `next/router` 사용 금지
- Tailwind CSS 4 + shadcn/ui 컴포넌트 사용
- 데이터베이스: Supabase (Postgres)
- 인증: Supabase Auth (email) — `components/AuthProvider.tsx`/`useAuth()` 사용


## 해결된 이슈

- `app/globals.css`에 디자인 토큰 추가 — `--primary`를 H S% L% 형식으로 설정함
- Ch8: `lib/supabase/client.ts` (브라우저용 createClient) 추가됨
- Ch9: `components/AuthProvider.tsx` 및 `useAuth()` 훅 구현됨


## 알게 된 점

- shadcn/ui는 컴포넌트 코드를 프로젝트에 복사해서 사용함 — `components/ui/` 폴더 확인
- Server Components가 기본이며, 클라이언트 전용 로직에만 `"use client"` 추가

Project context — current status

- Framework: Next.js App Router (Next 16.2.1). Server Components by default.
- Styling: Tailwind CSS v4, `tw-animate-css` available.
- UI primitives: `shadcn` package present; `components/ui` contains `button`, `card`, `input` stubs.
- Design tokens: `app/globals.css` contains CSS variables; updated `--primary`/`--primary-foreground`.

Recent actions
- Added `ARCHITECTURE.md`, `copilot-instructions.md`, `todo.md`, `docs/wireframe-1.svg`, `docs/wireframe-2.svg`.
- Added `components/ui/theme.tsx` with a `ThemeToggle` and token helper.
- Updated `app/globals.css` to include requested `--primary` token.

Tech decisions
- Use shadcn/ui as the canonical component system; map its styles to CSS tokens.
- Supabase selected for Ch8~12 (Auth, DB, Storage). Use `profiles` table linked to Supabase `auth.users`.
- Prefer Server Components for rendering; use Client Components for forms, auth flows, and realtime updates.

Package notes:
- 교재 기준(Ch7·Ch8): `next@16.2.1`, `@supabase/supabase-js@2.47.12`, `@supabase/ssr@0.5.2`.
- 현재 설치 기준(`package.json`):
	- `@supabase/supabase-js`: 2.105.4
	- `@supabase/ssr`: 0.10.3
	- `next`: 16.2.1

참고: 실 운영 환경에서 패키지 버전 차이는 API 차이를 발생시킬 수 있으므로, Ch10 구현 시 교재 예제(교재 기준)를 우선 가이드로 삼고 `package.json`의 실제 버전과 차이가 있는 경우 코드 주석으로 병기한다.

Open tasks
- Run `npx shadcn@latest init` and add required components.
- Add `@supabase/supabase-js` and create SQL migrations for `profiles`/`posts`/`comments`.
- Implement RLS policies and test auth flows.

