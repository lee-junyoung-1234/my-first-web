"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Toast from "@/components/Toast";
import supabase from "@/lib/supabase/client";

type Props = {
  id: string;
  user_id: string;
  title?: string;
  content?: string;
};

export default function PostActions({ id, user_id, title: propTitle, content: propContent }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isAuthor = !!user?.id && user.id === user_id;

  async function handleDelete() {
    // confirmation
    if (!confirm("게시글을 삭제하시겠습니까?")) return;

    // Note: This UI check only controls visibility. Actual authorization should
    // be enforced on the server with RLS or server-side checks (Ch11).
    setDeleting(true);
    setError(null);
    try {
      const { error: delError } = await supabase.from("posts").delete().eq("id", id);
      if (delError) {
        setError(delError.message || "삭제에 실패했습니다.");
        setDeleting(false);
        return;
      }
      router.push("/posts");
    } catch (e) {
      setError((e as any)?.message || "삭제에 실패했습니다.");
      setDeleting(false);
    }
  }

  function startEdit(currentTitle?: string, currentContent?: string) {
    setTitle(currentTitle ?? propTitle ?? "");
    setContent(currentContent ?? propContent ?? "");
    setEditing(true);
    setError(null);
  }

  function cancelEdit() {
    setEditing(false);
    setError(null);
  }

  async function submitEdit() {
    setError(null);
    if (!title.trim() || !content.trim()) return setError("제목과 내용을 모두 입력하세요.");
    setDeleting(true); // reuse loading state
    try {
      const { error: updError } = await supabase
        .from("posts")
        .update({ title: title.trim(), content: content.trim() })
        .eq("id", id);
      if (updError) {
        setError(updError.message || "수정에 실패했습니다.");
        setDeleting(false);
        return;
      }
      router.push("/posts");
    } catch (e) {
      setError((e as any)?.message || "수정에 실패했습니다.");
      setDeleting(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as any);
      }
    };
  }, []);

  if (!isAuthor) return null;

  return (
    <>
      {!editing ? (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => startEdit()}
            className="px-3 py-1 border rounded bg-white"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1 border rounded text-red-600"
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
          {error && <div className="text-sm text-red-600 ml-2">오류: {error}</div>}
        </div>
      ) : (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <div className="mb-2">
            <label className="block text-sm mb-1">제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2" />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border rounded p-2 h-36" />
          </div>
          <div className="flex gap-2">
            <button onClick={submitEdit} disabled={deleting} className="px-3 py-1 bg-indigo-600 text-white rounded">
              {deleting ? "수정 중..." : "저장"}
            </button>
            <button onClick={cancelEdit} className="px-3 py-1 border rounded">취소</button>
            {error && <div className="text-sm text-red-600 ml-2">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
}
