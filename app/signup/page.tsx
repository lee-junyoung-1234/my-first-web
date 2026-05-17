"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await signUpWithEmail(email, password, name);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">회원가입</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full p-2 border" placeholder="이름" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border" placeholder="비밀번호" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-600">{error}</div>}
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">회원가입</button>
      </form>
    </div>
  );
}
