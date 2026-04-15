"use client";

import { useState } from "react";

type Post = {
  id: number | string;
  title: string;
  content: string;
  author: string;
  date: string;
};

type Props = {
  onCreate: (p: Post) => void;
  onClose?: () => void;
};

export default function PostForm({ onCreate, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || "Anonymous",
      date: new Date().toISOString(),
    };

    onCreate(newPost);
    setTitle("");
    setAuthor("");
    setContent("");
    setError("");
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input
        className="w-full border rounded p-2 mb-2"
        value={title}
        placeholder="제목"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border rounded p-2 mb-2"
        value={author}
        placeholder="작성자 (선택)"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2 mb-2"
        value={content}
        placeholder="내용"
        rows={4}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">작성</button>
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">취소</button>
      </div>
    </form>
  );
}
