"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function HeaderAuth() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="space-x-4">
        <Link href="/login" className="text-gray-200 hover:underline">로그인</Link>
        <Link href="/signup" className="text-gray-200 hover:underline px-3 py-1 bg-blue-600 rounded-md hover:no-underline hover:bg-blue-700 transition">회원가입</Link>
      </div>
    );
  }

  return (
    <>
      <span className="text-gray-200">{user?.email ?? '사용자'}</span>
      <button onClick={handleSignOut} className="ml-3 bg-red-600 text-white px-2 py-1 rounded">로그아웃</button>
    </>
  );
}
