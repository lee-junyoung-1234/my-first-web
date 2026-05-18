"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";
import PostForm from "@/app/components/PostForm";
import supabase from "@/lib/supabase/client";
import Toast from "@/components/Toast";
import { useAuth } from "@/components/AuthProvider";

type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
};

export default function PostsClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [pendingTitle, setPendingTitle] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, user_id, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!mounted) return;
        setPosts((data as any) || []);
      } catch (e: any) {
        console.error("Failed to load posts", e);
        setError(e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as any);
      }
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => (`${p.title} ${p.content} ${p.user_id}`).toLowerCase().includes(q));
  }, [posts, query]);

  function handleCreate(p: Post) {
    setPosts((s) => [p, ...s]);
  }

  function performServerDelete(id: string) {
    return fetch(`/api/posts/${id}`, { method: "DELETE" });
  }

  function handleUndo() {
    if (timerRef.current) {
      clearTimeout(timerRef.current as any);
      timerRef.current = null;
    }
    if (pendingDelete) {
      setDeleting((d) => {
        const copy = { ...d };
        delete copy[pendingDelete];
        return copy;
      });
    }
    setPendingDelete(null);
    setPendingTitle(null);
    setShowToast(false);
  }

  function handleCloseToast() {
    handleUndo();
  }

  function handleDelete(id: string) {
    const target = posts.find((x) => x.id === id);
    if (!target) return;
    if (!confirm(`${target.title}을(를) 삭제하시겠습니까?`)) return;

    // enter pending delete state
    setDeleting((d) => ({ ...d, [id]: true }));
    setPendingDelete(id);
    setPendingTitle(target.title);
    setShowToast(true);

    // set timer to actually delete after 5s
    timerRef.current = setTimeout(async () => {
      try {
        const res = await performServerDelete(id);
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "삭제에 실패했습니다.");
        }
        // remove locally
        setPosts((s) => s.filter((x) => x.id !== id));
      } catch (e: any) {
        console.error("Delete failed", e);
        alert(e.message || "삭제에 실패했습니다.");
      } finally {
        setDeleting((d) => {
          const copy = { ...d };
          delete copy[id];
          return copy;
        });
        setPendingDelete(null);
        setPendingTitle(null);
        setShowToast(false);
        timerRef.current = null;
      }
    }, 5000);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">블로그</h1>
        <button onClick={() => setShowForm((v) => !v)} className="px-3 py-1 border rounded">
          {showForm ? "폼 닫기" : "새 글 작성"}
        </button>
      </div>

      {showForm && <PostForm onCreate={handleCreate} onClose={() => setShowForm(false)} />}

      <SearchBar onSearch={setQuery} placeholder="제목, 내용, 작성자 검색" />

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg animate-pulse">
                  <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
                  <div className="h-24 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          )}
      {error && <p className="mt-4 text-red-600">오류: {error}</p>}

      {!loading && posts.length === 0 && <p className="mt-4">등록된 게시글이 없습니다.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filtered.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg hover:shadow-lg transition">
            <Link href={`/posts/${post.id}`} className="block">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{post.user_id} · {new Date(post.created_at).toLocaleString()}</p>
              <p className="mt-3 text-gray-600">{post.content?.slice(0, 120)}{post.content && post.content.length > 120 ? '...' : ''}</p>
            </Link>
            <div className="mt-3 flex gap-2">
              {user?.id === post.user_id && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-2 py-1 text-sm border rounded text-red-600"
                  disabled={!!deleting[post.id] || !!pendingDelete}
                >
                  {deleting[post.id] ? "삭제 중..." : pendingDelete === post.id ? "삭제 예정..." : "삭제"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {showToast && (
        <Toast
          message={`${pendingTitle ?? "게시글"}을 삭제했습니다.`}
          actionLabel="실행 취소"
          onAction={handleUndo}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}
