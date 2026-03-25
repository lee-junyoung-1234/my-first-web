export default function Home() {
  const posts = [
    {
      id: 1,
      title: "시작하며: 블로그를 여는 글",
      excerpt: "이 블로그는 개발과 일상, 공부 기록을 모아두는 공간입니다.",
      date: "2026-03-25",
    },
    {
      id: 2,
      title: "Next.js App Router 사용 가이드",
      excerpt: "App Router의 기본 구조와 권장 사용 패턴을 정리합니다.",
      date: "2026-03-10",
    },
    {
      id: 3,
      title: "Tailwind로 빠르게 스타일링하기",
      excerpt: "유틸리티 기반의 빠른 스타일링 팁들을 공유합니다.",
      date: "2026-02-28",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-2xl font-bold">이준영의 블로그</h1>
          <p className="mt-1 text-sm text-zinc-600">공공인재 · 한신대학교 · 개발·일상 기록</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-black">{post.title}</h2>
                <p className="mt-2 text-sm text-zinc-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>{post.date}</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    읽기
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium">소개</h3>
            <p className="mt-2 text-sm text-zinc-600">이준영 · 한신대학교 · 공공인재</p>

            <div className="mt-6">
              <h4 className="text-sm font-medium">카테고리</h4>
              <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                <li>개발</li>
                <li>학습</li>
                <li>일상</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-500">© 2026 이준영</div>
      </footer>
    </div>
  );
}
