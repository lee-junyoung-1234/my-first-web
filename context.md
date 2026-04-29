
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

