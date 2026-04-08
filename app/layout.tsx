import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-semibold">내 블로그</Link>
            <div className="space-x-4">
              <Link href="/" className="text-gray-200 hover:underline">홈</Link>
              <Link href="/posts" className="text-gray-200 hover:underline">게시글</Link>
              <Link href="/posts/new" className="text-gray-200 hover:underline">새 글 쓰기</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <footer className="text-center text-gray-500 py-4">© 2026 내 블로그</footer>
      </body>
    </html>
  );
}
