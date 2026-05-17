"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "@/lib/auth";
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    // naive: reload to update state
    window.location.href = "/";
  };

  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <Link href="/" className="font-semibold">내 블로그</Link>
      <div className="space-x-4">
        <Link href="/" className="text-gray-200 hover:underline">홈</Link>
        <Link href="/posts" className="text-gray-200 hover:underline">게시글</Link>
        <Link href="/posts/new" className="text-gray-200 hover:underline">새 글 쓰기</Link>
        {user ? (
          <button className="text-gray-200 hover:underline" onClick={handleSignOut} disabled={loading}>
            로그아웃
          </button>
        ) : (
          <>
            <Link href="/login" className="text-gray-200 hover:underline">로그인</Link>
            <Link href="/signup" className="text-gray-200 hover:underline">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
