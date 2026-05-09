# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-09
- 완료된 작업: 기본 앱 구조 (Ch1~6), 홈/포스트 목록 페이지, 기본 레이아웃
- 진행 중: ARCHITECTURE.md 보강, shadcn/ui 테마 적용
- 미착수: Supabase 연결, 인증 완성, RLS 설정

## 기술 결정 사항

- Next.js App Router (app/ 폴더) 사용
- Tailwind CSS 4 + shadcn/ui 컴포넌트 사용
- 데이터베이스: Supabase (Postgres) 예정
- 인증: Supabase Auth (email) 예정

## 해결된 이슈

- `app/globals.css`에 디자인 토큰 추가 — `--primary`를 H S% L% 형식으로 설정함

## 알게 된 점

- shadcn/ui는 컴포넌트 코드를 프로젝트에 복사해서 사용함 — components/ui/ 폴더 확인
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
- Supabase selected for Ch8~12 (Auth, DB, RLS). Use `profiles` table linked to Supabase `auth.users`.
- Prefer Server Components for rendering; use Client Components for forms, auth flows, comments, and realtime updates.

Open tasks
- Run `npx shadcn@latest init` and add required components.
- Add `@supabase/supabase-js` and create SQL migrations for `profiles`/`posts`/`comments`.
- Implement RLS policies and test auth flows.

