"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import supabase from "@/lib/supabase/client";

export default function NewPostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFieldErrors({});

    const t = title.trim();
    const c = content.trim();
    const errs: { title?: string; content?: string } = {};
    if (t.length < 3) errs.title = "제목은 최소 3자 이상 입력하세요.";
    if (t.length > 200) errs.title = "제목은 최대 200자까지 허용됩니다.";
    if (c.length < 10) errs.content = "내용은 최소 10자 이상 입력하세요.";
    if (c.length > 10000) errs.content = "내용이 너무 깁니다.";
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setSaving(false);
      return;
    }
    try {
      const body = { title: t, content: c };
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = (session as any)?.access_token;
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
      setError((err as any)?.message || "저장에 실패했습니다.");
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
          {fieldErrors.title && <p className="text-sm text-red-600 mt-1">{fieldErrors.title}</p>}
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
          {fieldErrors.content && <p className="text-sm text-red-600 mt-1">{fieldErrors.content}</p>}
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
        {error && <p className="text-sm text-red-600">오류: {error}</p>}
      </form>
    </div>
  );
}
