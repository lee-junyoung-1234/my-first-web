# GitHub Copilot 지침

- Tech Stack:
  - Next.js: 16.2.1 (App Router ONLY)
  - Tailwind CSS: ^4

- Coding Conventions:
  - 기본적으로 Server Component 사용 (App Router 기준)
  - 스타일링은 Tailwind CSS만 사용

- Known AI Mistakes / 금지사항:
  - `next/router` 사용 금지 — `next/navigation`을 사용하세요
  - Pages Router 금지 (App Router만 허용)
  - `params`를 사용할 때는 반드시 `await`를 사용해야 합니다
