import Link from "next/link";
import { posts } from "../../../lib/posts";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-lg shadow p-8">
          <h1 className="text-2xl font-semibold mb-4">게시글을 찾을 수 없습니다</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.</p>
          <Link href="/posts" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 flex items-start justify-center bg-slate-50 dark:bg-slate-900">
      <article className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="prose prose-slate dark:prose-invert mb-6">{post.content}</div>
        <Link href="/posts" className="inline-block mt-4 text-sm text-blue-600 hover:underline">← 목록으로 돌아가기</Link>
      </article>
    </main>
  );
}
