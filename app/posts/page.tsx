"use client";

import dynamic from "next/dynamic";

const PostsClient = dynamic(() => import("@/app/components/PostsClient"), {
  ssr: false,
  loading: () => <div className="max-w-4xl mx-auto p-6">로딩 중...</div>,
});

export default function PostsPage() {
  return <PostsClient />;
}
