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
	- Create Supabase project, obtain `SUPABASE_URL` and `SUPABASE_ANON_KEY` and `SERVICE_ROLE_KEY`.
	- Add `@supabase/supabase-js` to dependencies.
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

