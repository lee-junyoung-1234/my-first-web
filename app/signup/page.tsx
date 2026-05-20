"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpWithEmail } from "@/lib/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUpWithEmail(email, password, name);
      if (error) {
        // Supabase 에러 메시지를 한국어로 변환
        const msg = error.message ?? "";
        if (msg.includes("already registered") || msg.includes("already been registered")) {
          setError("이미 사용 중인 이메일입니다. 로그인해주세요.");
        } else if (msg.includes("Password should be")) {
          setError("비밀번호는 6자 이상이어야 합니다.");
        } else if (msg.includes("Invalid email")) {
          setError("유효하지 않은 이메일 형식입니다.");
        } else if (msg.includes("supabase") || msg.toLowerCase().includes("network") || msg.includes("fetch")) {
          setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          setError(msg || "회원가입에 실패했습니다.");
        }
        setLoading(false);
        return;
      }
      // 이메일 확인이 비활성화된 경우 바로 로그인 페이지로
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">회원가입 완료!</h2>
          <p className="text-slate-500">로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✏️</div>
          <h1 className="text-3xl font-bold text-slate-800">회원가입</h1>
          <p className="text-slate-500 mt-2 text-sm">내 블로그에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* 이름 */}
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1">
              이름
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* 이메일 */}
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">
              비밀번호
              <span className="text-slate-400 font-normal ml-1">(6자 이상)</span>
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                처리 중...
              </>
            ) : (
              "가입하기"
            )}
          </button>
        </form>

        {/* 로그인 링크 */}
        <p className="text-center text-sm text-slate-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
