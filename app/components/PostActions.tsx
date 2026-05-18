"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Toast from "@/components/Toast";

type Props = {
  id: string;
  user_id: string;
};

export default function PostActions({ id, user_id }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAuthor = !!user?.id && user.id === user_id;

  function handleDelete() {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;

    // Enter pending delete state and show undo toast for 5 seconds
    setPendingDelete(true);
    setShowToast(true);
    // set a timer to perform actual deletion after 5s
    timerRef.current = setTimeout(async () => {
      setDeleting(true);
      try {
        const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "삭제 실패");
        }
        // on success navigate away
        router.push("/posts");
      } catch (e: any) {
        alert(e.message || "삭제에 실패했습니다.");
        setDeleting(false);
        setPendingDelete(false);
        setShowToast(false);
      }
    }, 5000);
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
      <div className="mt-4 flex gap-2">
        <Link href={`/posts/${id}/edit`} className="px-3 py-1 border rounded bg-white">수정</Link>
        <button
          onClick={handleDelete}
          disabled={deleting || pendingDelete}
          className="px-3 py-1 border rounded text-red-600"
        >
          {deleting ? "삭제 중..." : pendingDelete ? "삭제 예정..." : "삭제"}
        </button>
      </div>

      {showToast && (
        <Toast
          message="게시글을 삭제했습니다."
          actionLabel="실행 취소"
          onAction={() => {
            if (timerRef.current) {
              clearTimeout(timerRef.current as any);
              timerRef.current = null;
            }
            setPendingDelete(false);
            setShowToast(false);
          }}
          onClose={() => {
            if (timerRef.current) {
              clearTimeout(timerRef.current as any);
              timerRef.current = null;
            }
            setPendingDelete(false);
            setShowToast(false);
          }}
        />
      )}
    </>
  );
}
