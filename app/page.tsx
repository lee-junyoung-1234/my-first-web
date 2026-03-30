export default function Home() {
  const posts = [
    {
      id: 1,
      title: "시작하며: 블로그를 여는 글",
      excerpt: "이 블로그는 개발과 일상, 공부 기록을 모아두는 공간입니다.",
      author: "이준영",
      date: "2026-03-25",
    },
    {
      id: 2,
      title: "Next.js App Router 사용 가이드",
      excerpt: "App Router의 기본 구조와 권장 사용 패턴을 정리합니다.",
      author: "이준영",
      date: "2026-03-10",
    },
    {
      id: 3,
      title: "Tailwind로 빠르게 스타일링하기",
      excerpt: "유틸리티 기반의 빠른 스타일링 팁들을 공유합니다.",
      author: "이준영",
      date: "2026-02-28",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-4xl p-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">이준영의 블로그</h1>
              <p className="mt-1 text-sm text-zinc-600">공공인재 · 한신대학교 · 개발·일상 기록</p>
            </div>

            <nav aria-label="주요 네비게이션" className="flex justify-between items-center">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a href="#" className="text-zinc-700 hover:underline">
                    홈
                  </a>
                </li>
                <li>
                  <a href="#" className="text-zinc-700 hover:underline">
                    소개
                  </a>
                </li>
                <li>
                  <a href="#" className="text-zinc-700 hover:underline">
                    카테고리
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-bold text-black">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <span className="text-sm text-gray-600">{post.author}</span>
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-4xl p-4 text-center text-sm text-gray-400">© 2026 이준영</div>
      </footer>
    </div>
  );
}
