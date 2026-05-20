"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

type PostRow = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
};

type Props = {
  mode?: "create" | "edit";
  initialValues?: Partial<PostRow> | null;
  onCreate?: (p: PostRow) => void; // called after create or update
  onClose?: () => void;
};

export default function PostForm({ mode = "create", initialValues = null, onCreate, onClose }: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const isEdit = mode === "edit";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!user?.id) {
      setError("로그인 후 작성할 수 있습니다.");
      return;
    }

    try {
      if (!isEdit) {
        const { data, error } = await supabase
          .from("posts")
          .insert({ title: title.trim(), content: content.trim(), user_id: user.id })
          .select("id, title, content, user_id, created_at")
          .single();

        if (error) throw error;

        const created = data as PostRow;
        onCreate?.(created);
        setTitle("");
        setContent("");
        setError("");
        onClose?.();
        router.push(`/posts/${created.id}`);
      } else {
        // edit mode
        const id = initialValues?.id;
        if (!id) {
          setError("수정할 게시글 ID가 없습니다.");
          return;
        }

        // UX 제어용 클라이언트 체크 — 보안이 아님
        // 실제 권한 검증(행 수준 보안, RLS)은 Ch11에서 처리합니다.
        if (initialValues?.user_id && initialValues.user_id !== user.id) {
          setError("이 글을 수정할 권한이 없습니다.");
          return;
        }

        const { data, error } = await supabase
          .from("posts")
          .update({ title: title.trim(), content: content.trim() })
          .eq("id", id)
          .select("id, title, content, user_id, created_at")
          .single();

        if (error) throw error;

        const updated = data as PostRow;
        onCreate?.(updated);
        setError("");
        onClose?.();
        router.push(`/posts/${updated.id}`);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || (isEdit ? "게시글 수정에 실패했습니다." : "게시글 작성에 실패했습니다."));
    }
  }

  // UX 용도: 작성자가 아닌 경우 수정 버튼 비활성화 (보안이 아닌 UX 제어)
  const notOwner = isEdit && initialValues?.user_id && user?.id && initialValues.user_id !== user.id;

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {notOwner && <div className="text-yellow-600 mb-2">이 글을 수정할 권한이 없습니다.</div>}
      <input
        className="w-full border rounded p-2 mb-2"
        value={title}
        placeholder="제목"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2 mb-2"
        value={content}
        placeholder="내용"
        rows={6}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={notOwner}>
          {isEdit ? "수정" : "작성"}
        </button>
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">취소</button>
      </div>
    </form>
  );
}
