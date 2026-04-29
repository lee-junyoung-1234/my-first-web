
AGENTS.md를 참조한다

## Design Tokens

- Core tokens (define in `app/globals.css` as CSS variables):
  - `--primary`: main brand HSL (or space-separated H S% L% as project uses)
  - `--primary-foreground`: text color to use on `--primary`
  - `--background`, `--foreground`
  - `--card`, `--card-foreground`
  - `--muted`, `--muted-foreground`
  - `--radius`, `--radius-md`, `--radius-lg`

- Usage guidance:
  - Prefer semantic tokens in component styles (e.g., use `bg-[color:var(--card)]` or Tailwind plugin mapping).
  - Keep tokens neutral — change tokens for theming instead of changing component CSS.
  - Define both light and `.dark` theme values in `app/globals.css`.

## Component Rules

- Use `components/ui/` shadcn primitives for consistency: `Button`, `Card`, `Input`, `Dialog`, `Textarea`.
- Default to Server Components; add `"use client"` only for interactivity (forms, local state, event handlers, subscriptions).
- Navigation: use `next/navigation` for client navigation (`useRouter` from `next/router` is disallowed).
- Accessibility: ensure focus-visible styles use `--ring` token and components expose `aria-*` props.
- Theming: components read CSS variables; do not hardcode colors. Accept `className` overrides only.

## Theming Implementation Notes

- Map Tailwind colors to CSS vars via the Tailwind config or use `bg-[color:var(--primary)]` utilities.
- Example CSS variable usage in components:
  - className="bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"

## Workflow

- To initialize shadcn in this repo run:

```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

- After adding components, map their color classes to the design tokens in `app/globals.css`.

