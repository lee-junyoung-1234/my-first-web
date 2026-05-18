Project agent rules — my-first-web (Ch10)

- 목적: Ch10 게시글 CRUD 작업을 안전하게 진행하기 위한 에이전트 규칙.
- 기본 원칙: Ch7·Ch8 교재 기준을 우선 적용하되, 실제 `package.json`의 버전이 더 최신이면 삭제하지 말고 병기하여 참고한다.

필수 재사용 코드
- Supabase 클라이언트: `lib/supabase/client.ts` 를 사용한다.
- 인증 패턴: `components/AuthProvider.tsx` 와 `useAuth()` 훅을 사용한다.

데이터 모델 제약
- `posts` 컬럼명은 Ch8 스키마( `id`, `user_id`, `title`, `content`, `created_at`)를 그대로 사용한다.
- 컬럼명을 임의로 변경하거나 대체 이름(`authorId`, `body` 등)을 도입하지 않는다.

라우터/네비게이션
- App Router만 사용한다. `pages/` 라우터 생성 금지.
- `next/router` 사용 금지 — 필요 시 `next/navigation`을 사용한다.

보안과 UI 분리
- 수정/삭제 버튼의 표시 여부는 UX 차원으로만 제어한다.
- 실제 권한 검증은 Ch11에서 RLS로 구현한다. 즉, UI에서 작성자만 버튼을 보게 하는 것은 시각적 제어일 뿐 RLS를 대신하지 않는다.

패키지 버전 안내
- 교재 기준(예시): `next@16.2.1`, `@supabase/supabase-js@2.47.12`, `@supabase/ssr@0.5.2`.
- 현재 설치 기준: 프로젝트 `package.json`의 의존성을 우선 확인하고 답변 시 병기한다.

체크리스트(작업 전)
- `lib/supabase/client.ts` 파일이 존재하는가?
- `components/AuthProvider.tsx`와 `useAuth()`가 구현되어 있고 `app/layout.tsx`에 연결되어 있는가?
- `posts` 테이블 컬럼명을 변경하는 제안이 포함되어 있지 않은가?
- 새 라이브러리 추가를 요구하지 않는가?

행동 규칙
- 코드 생성/수정 시 위 제약을 문서의 첫 줄에 주석으로 남기고 진행한다.
- 변경이 필요한 경우 먼저 PR 형태의 변경 범위를 제안하라.
