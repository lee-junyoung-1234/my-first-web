export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string; // YYYY-MM-DD
};

export const posts: Post[] = [
  {
    id: 1,
    title: "React 19 새 기능 정리",
    content:
      "React 19에서 달라진 점과 마이그레이션 팁을 정리합니다. 렌더링 성능 개선과 새로운 훅 사용법 등을 다룹니다.",
    author: "김코딩",
    date: "2026-03-30",
  },
  {
    id: 2,
    title: "Tailwind CSS 4 변경사항",
    content:
      "Tailwind CSS 4의 주요 변경점과 마이그레이션 가이드를 소개합니다. 유틸리티 네이밍과 새로운 플러그인 사용법을 포함합니다.",
    author: "이디자인",
    date: "2026-03-28",
  },
  {
    id: 3,
    title: "Next.js 16 App Router 가이드",
    content:
      "App Router의 기본 개념과 폴더 기반 라우팅, 동적 라우트 및 데이터 패칭 패턴을 예제와 함께 설명합니다.",
    author: "박개발",
    date: "2026-03-25",
  },
];
