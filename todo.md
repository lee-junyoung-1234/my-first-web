# TODO — my-first-web

## 1단계: 아키텍처 및 테마 (Ch7)
- [x] ARCHITECTURE.md 작성 (페이지 맵, 컴포넌트 계층, 데이터 모델)
- [x] copilot-instructions.md 보강 (Design Tokens, Component Rules)
- [x] context.md 작성
- [ ] shadcn/ui 초기화 (`npx shadcn@latest init`)
- [ ] shadcn/ui 컴포넌트 추가 (`button`, `card`, `input`)
- [ ] `app/globals.css` 디자인 토큰 검증 및 조정

## 2단계: 핵심 기능 (Ch8~9)
- [x] Supabase 프로젝트 설정 및 `profiles`, `posts` 테이블 생성 (마이그레이션은 별도)
- [x] 포스트 목록 페이지 데이터 연결 (read 연결 필요 확인)
- [x] 포스트 상세 페이지 구현 (기본 서버 렌더링 구성)
- [x] 포스트 작성(Create) 및 편집(Edit) — UI 스켈레톤 준비, 연결 필요
- [x] 인증(Login/Signup) 연결 (Supabase Auth) — `components/AuthProvider.tsx` 구현

## 3단계: 고급 기능 (Ch10~12)
- [ ] Ch10 게시글 CRUD: `app/posts`, `app/posts/[id]`, `app/posts/new`, 편집/삭제 UI
- [ ] 마이페이지 및 프로필 편집
- [ ] 댓글 기능
- [ ] RLS(행 수준 보안) 정책 적용 (Ch11)

## 진행률
- 단계 1: 3/6
Project TODO (end-to-end for Ch8~12)

Completed
- Architecture docs — `ARCHITECTURE.md`
- Page map & data model — done
- AI wireframes — `docs/wireframe-1.svg`, `docs/wireframe-2.svg`

In progress
- shadcn theme & tokens — map CSS variables to shadcn components (in progress)

Upcoming (Ch8 - Ch12 implementation roadmap)
1. Init shadcn and add primitives
	- Command: `npx shadcn@latest init` then `npx shadcn@latest add button card input`
2. Supabase setup
	- Create Supabase project, obtain `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SERVICE_ROLE_KEY`.
	- `lib/supabase/client.ts` exists and is the canonical client for browser usage.
3. Database migrations
	- SQL migration: create `profiles`, `posts`, `comments`, `tags`, `post_tags`.
	- Add indexes and seed an admin account.
4. RLS policies
	- Add policies for `posts` (select/insert/update/delete) and `profiles` updates.
5. Auth flows
	- Implement `/login`, `/signup` using Supabase Auth (email/password + OAuth optional).
6. API routes & server integration
	- Implement `app/api/posts/route.ts` and auth helper routes.
7. UI Implementation
	- Build `app/posts`, `app/posts/[id]`, `app/posts/new` using Server + Client Components.
	- Use `components/ui/*` shadcn primitives.
8. Tests & QA
	- Add integration tests for auth and posts CRUD.
9. Deployment
	- Configure environment variables in hosting (Vercel) and ensure service role key safety.

Progress summary:
- Completed: architecture + wireframes + docs
- Next: run `npx shadcn@latest init` and create migrations

