"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";
import PostForm from "@/app/components/PostForm";

type Post = {
  id: number | string;
  title: string;
  content: string;
  author: string;
  date: string;
};

type Props = {
  initialPosts: Post[];
};

export default function PostsClient({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      (`${p.title} ${p.content} ${p.author}`).toLowerCase().includes(q)
    );
  }, [posts, query]);

  function handleCreate(p: Post) {
    setPosts((s) => [p, ...s]);
  }

  function handleDelete(id: number | string) {
    const target = posts.find((x) => x.id === id);
    if (!target) return;
    if (!confirm(`${target.title}을(를) 삭제하시겠습니까?`)) return;
    setPosts((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">블로그</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-3 py-1 border rounded"
        >
          {showForm ? "폼 닫기" : "새 글 작성"}
        </button>
      </div>

      {showForm && <PostForm onCreate={handleCreate} onClose={() => setShowForm(false)} />}

      <SearchBar onSearch={setQuery} placeholder="제목, 내용, 작성자 검색" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg hover:shadow-lg transition">
            <Link href={`/posts/${post.id}`} className="block">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{post.author} · {new Date(post.date).toLocaleString()}</p>
              <p className="mt-3 text-gray-600">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
            </Link>
            <div className="mt-3 flex gap-2">
              <button onClick={() => handleDelete(post.id)} className="px-2 py-1 text-sm border rounded text-red-600">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
