AI Design Validation Checklist (7.8.3)

Purpose: quick validation of generated UI/wireframes and theme tokens.

1) Readability
- [x] Typography scales readable on desktop/mobile
- [x] Contrast between foreground and background meets WCAG AA for body text (tokens used)

2) Layout
- [x] Wireframes show clear hierarchy: header, content, sidebar, footer
- [x] Forms have clear inputs and call-to-action placement

3) Component Consistency
- [x] Button, Card, Input primitives present in `components/ui`
- [x] Components reference CSS tokens (via `app/globals.css`)

4) Theming
- [x] Light and dark tokens defined in `app/globals.css`
- [ ] Verify color usage on interactive states (hover, active, focus). TODO: run visual QA.

5) Accessibility
- [x] Focus ring token exists (`--ring`) and is used in components
- [ ] Ensure form labels are associated with inputs in final implementation

6) Supabase readiness
- [x] Data model aligns with pages and interactions
- [ ] Plan RLS policies for `posts` and `profiles`: TODO implement and test

Notes:
- Completed quick checks; items left as TODO require interactive/visual testing after shadcn init and component styling.
