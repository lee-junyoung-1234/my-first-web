## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Design Tokens

- Primary color: shadcn/ui --primary
- Background: --background
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.

## Ch10 규칙(게시글 CRUD)

- Ch7·Ch8 교재 기준 패키지를 우선 참조하되, 실제 `package.json`의 버전이 더 최신이면 함께 표기한다.
- Supabase 클라이언트는 `lib/supabase/client.ts`를 사용한다. 브라우저/클라이언트 호출은 이 파일을 재사용할 것.
- 인증 상태는 `components/AuthProvider.tsx`와 `useAuth()` 훅을 사용한다.
- `posts` 스키마 컬럼명(`id`, `user_id`, `title`, `content`, `created_at`)을 변경하지 말 것.
- 수정/삭제 UI는 UX 제어만 담당한다. 권한 검증/행 수준 보안(RLS)은 Ch11에서 처리한다.
- `service_role` 키는 서버 전용 키이므로 브라우저 등 클라이언트(또는 클라이언트 번들에 포함되는 곳)에서 절대 사용하지 않는다.