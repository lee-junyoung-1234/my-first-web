# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-09
- 완료된 작업: 기본 앱 구조 (Ch1~6), 홈/포스트 목록 페이지, 기본 레이아웃
- 진행 중: ARCHITECTURE.md 보강, shadcn/ui 테마 적용
- 완료/연결됨: Ch8 Supabase 클라이언트(`lib/supabase/client.ts`) 추가, Ch9 인증 `AuthProvider`/`useAuth` 구현

- 미착수: RLS 설정 (Ch11에서 진행)

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

