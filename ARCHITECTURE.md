# ARCHITECTURE — my-first-web

## Project Goal

Personal blog for reading and writing posts. Readers can browse posts; authenticated users can create, edit, and manage their posts.

Ch10 notes:

- Ch10 목적: 게시글 CRUD(목록, 상세, 작성, 수정, 삭제)를 App Router 기반으로 연결한다.
- Supabase 클라이언트는 `lib/supabase/client.ts`를 기본으로 사용한다.
- 인증 상태는 `components/AuthProvider.tsx`와 `useAuth()` 훅을 재사용한다.
- `posts` 테이블의 컬럼명(`id`, `user_id`, `title`, `content`, `created_at`)은 Ch8 스키마를 그대로 따른다. 컬럼명 임의 변경 금지.
- App Router만 사용하고 `next/router` 사용을 금지한다.
- 수정/삭제 UI는 UX 차원에서만 제어하며 실제 권한 검증(RLS)은 Ch11에서 적용한다.


## Tech Stack (summary)

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS 4
- shadcn/ui components in `components/ui/`
- Supabase (planned) for Auth, Database, Storage

## Page Map (App Router URLs)

```
/               → 홈 (포스트 목록)           (app/page.tsx)
/posts          → 포스트 목록               (app/posts/page.tsx)
/posts/new      → 포스트 작성               (app/posts/new/page.tsx)
/posts/[id]     → 포스트 상세               (app/posts/[id]/page.tsx)
/login          → 로그인                    (app/login/page.tsx)
/signup         → 회원가입                  (app/signup/page.tsx)
/mypage         → 마이페이지                (app/mypage/page.tsx)
```

## User Flows

- Read a post: Home → Post list → Post detail
- Write a post: Home → Posts → New → (if not logged in → Login) → New → Submit → Post detail
- Manage account: Login/Signup → Mypage → Edit profile

## Component Hierarchy (shadcn/ui focused)

- `app/layout.tsx` — Root layout (Header, Footer)
- `components/Header.tsx` — Nav, search bar, auth buttons (shadcn Button, Input)
- `components/PostCard.tsx` — Uses shadcn `Card` to display title, excerpt, meta, and action buttons
- `app/posts/page.tsx` — Server wrapper for `PostsClient`
- `app/components/PostsClient.tsx` — 목록, 로딩/스켈레톤, `PostForm`(생성) 및 검색 등을 총괄
- `app/components/PostForm.tsx` — 게시글 Create / Edit 양용 폼
- `app/components/PostActions.tsx` — 상세 및 목록에서 작성자(author)에게만 보이는 수정/삭제 버튼 제공
- `app/posts/[id]/page.tsx` — 포스트 상세 뷰 (Server Component)

**인증별 경로 접근 전략**:
- **공개 경로 (Public)**: `/`, `/posts`, `/posts/[id]`, `/login`, `/signup`
- **인증 필요 경로 (Protected)**: `/posts/new`, API 데이터 변경(글 작성, 수정, 삭제)
  - UI 상에서 작성 권한 여부를 체크하나, 실제적인 방어는 **Ch11에서의 RLS**에 의존함.

Component usage notes:
- Use `Card` for list items and author's card blocks.
- Use `Button` variants for primary/secondary actions following design tokens.
- Inputs and forms default to server components where possible; add `"use client"` only for local form state/validation.

## Data Model (Supabase-ready)

Tables (minimum):

1) `profiles` (사용자 프로필)

```
profiles
├── id: uuid PRIMARY KEY (references auth.users)
├── username: text
├── avatar_url: text
└── created_at: timestamptz
```

2) `posts` (포스트)

```
posts
├── id: uuid PRIMARY KEY
├── user_id: uuid REFERENCES profiles(id)  -- author
├── title: text
├── content: text
├── published: boolean DEFAULT false
└── created_at: timestamptz
```

Relationship: `profiles` 1 - N `posts` via `posts.user_id`.

## TODO / Future details

- TODO: Component props and folder structure (add after shadcn/ui install)
- TODO: API routes and Supabase table creation SQL (Ch8)
Blog Architecture (Enhanced)

Purpose
Enhance the Ch1~6 blog architecture to prepare for Supabase (Ch8~12): CRUD, Auth, RLS. Adds shadcn/ui theming, design tokens, page map, component hierarchy, and data model.

1. Page Map (App Router URLs)
- `/` — Home (server): latest posts, featured, search
- `/posts` — Posts list (server) — supports pagination, tag filter, search query
- `/posts/new` — Create post (client form) — auth-protected
- `/posts/[id]` — Post detail (server) — comments (client), share, metadata
- `/posts/[id]/edit` — Edit post (client form) — owner-only
- `/mypage` — My Page / Dashboard (client + server data) — drafts, published posts
- `/profile/[username]` — Public profile page (server) — user posts
- `/login` — Login (client)
- `/signup` — Signup (client)
- `/settings` — Account settings (auth)
- `/admin` — Admin dashboard (server/client) — user management, site metrics

API & server routes (App Router style):
- `app/api/posts/route.ts` — REST proxy to Supabase for posts (POST/PUT/DELETE)
- `app/api/auth/route.ts` — optional auth helper endpoints

Notes:
- Use Server Components for list/detail pages; mount Client Components for interactive pieces (forms, comments, live updates).

2. Component Hierarchy
- `app/layout.tsx` — Root layout, theme provider
- `components/ui/*` — shadcn/ui primitives (Button, Card, Input, Dialog)
- `components/PostsClient.tsx` — Client interactions (create/edit)
- `components/PostForm.tsx` — Post form (uses `Input`, `Textarea`, `Button`)
- `components/SearchBar.tsx` — Search / filter UI
- `app/posts/page.tsx` — Server component listing posts
- `app/posts/[id]/page.tsx` — Server component for post details + client comments

Design notes:
- Prefer Server Components for list/detail pages. Use Client Components for forms, auth flows, and realtime subscriptions.

3. Theming & Design Tokens
- Use CSS variables in `app/globals.css` (already present).
- Add `shadcn` theme tokens mapping to CSS variables:
  - `--primary`, `--primary-foreground`, `--background`, `--foreground`, `--card`, `--card-foreground`, `--muted`.
- Provide `components/ui/theme.tsx` (or `tailwind.config`) snippet to map tokens to shadcn components.

4. Data Model (Supabase-ready)
Core tables (minimum 2) and 1:N relationships. This matches the App Router pages above.

Table: `profiles` (users)
- `id` uuid PRIMARY KEY — use Supabase `auth.users.id`
- `email` text — nullable (auth provides)
- `username` text UNIQUE NOT NULL
- `display_name` text
- `avatar_url` text
- `bio` text
- `role` text DEFAULT 'user' CHECK (role IN ('user','admin'))
- `created_at` timestamptz DEFAULT now()

Table: `posts`
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id` uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- `title` text NOT NULL
- `slug` text UNIQUE NOT NULL
- `content` text NOT NULL -- markdown
- `published` boolean DEFAULT false
- `published_at` timestamptz
- `created_at` timestamptz DEFAULT now()
- `updated_at` timestamptz DEFAULT now()

Optional Table: `comments`
- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `post_id` uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE
- `user_id` uuid NOT NULL REFERENCES profiles(id)
- `content` text NOT NULL
- `created_at` timestamptz DEFAULT now()

Optional Table: `tags` and join `post_tags` (for filtering)
- `tags(id, name)` and `post_tags(post_id, tag_id)` for many-to-many

Indexes & constraints
- Index `posts(user_id)` for author queries
- Index `posts(slug)` UNIQUE for fast lookup
- Index `posts(published, published_at)` for listing published posts

RLS plan (high-level)
- `profiles`: SELECT restricted to public fields; UPDATE only to authenticated matching `auth.uid()` or admin.
- `posts`:
  - `SELECT`: public for rows where `published = true`; authors and admins can select unpublished rows.
  - `INSERT`: allow authenticated users; set `user_id = auth.uid()` on insert server-side or via policy.
  - `UPDATE/DELETE`: allow if `auth.uid() = user_id OR exists (SELECT 1 FROM profiles WHERE id = auth.uid() AND role='admin')`.

Example minimal RLS policy for `posts` UPDATE:
  - Policy expression: `auth.role() = 'authenticated' AND (auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')`

Migration notes
- Generate SQL migrations for tables and initial indexes. Seed a sample admin user and a test post.

5. API & Flow
- Use server-side routes in `app/api/posts/route.ts` as thin proxies to Supabase client in server environment.
- Client components call these routes for mutation; server components render lists using `getServerSession` or direct Supabase calls with service role if needed.

6. Wireframes
See `docs/wireframe-1.svg` and `docs/wireframe-2.svg` for two quick AI-style wireframes.

7. Next Steps
- Finalize shadcn init and map Tailwind tokens.
- Implement Supabase schema and RLS policies.
- Build auth flows and connect `posts` API.
