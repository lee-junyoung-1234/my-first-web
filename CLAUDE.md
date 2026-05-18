Claude 사용 시 지침:

- 기본 규칙 및 프로젝트 컨텍스트는 `AGENTS.md`를 따르라.
- Ch10 작업(게시글 CRUD)에서는 반드시 `lib/supabase/client.ts`와 `components/AuthProvider.tsx`/`useAuth()` 패턴을 재사용하라.
- `posts` 테이블 컬럼명(`id`, `user_id`, `title`, `content`, `created_at`)을 임의로 변경하지 말라.
- App Router만 사용하라( `next/router` 사용 금지 ).
