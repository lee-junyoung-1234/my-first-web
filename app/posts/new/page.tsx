"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function NewPostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { title, content, user_id: user?.id };
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "저장 실패");
      }

      const data = await res.json();
      const createdId = data?.post?.id;
      if (createdId) router.push(`/posts/${createdId}`);
      else router.push("/posts");
    } catch (err) {
      alert((err as any)?.message || "저장에 실패했습니다.");
      setSaving(false);
    }
  };

  if (!user) return <div>로그인 중 또는 리다이렉트 중...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-md p-2 h-48 resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          <button
            type="button"
            onClick={() => router.push('/posts')}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
