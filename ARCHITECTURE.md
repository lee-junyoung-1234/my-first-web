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
