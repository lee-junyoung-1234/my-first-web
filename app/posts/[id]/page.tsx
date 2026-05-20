import Link from "next/link";
import PostActions from "@/app/components/PostActions";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase env vars not set");
    notFound();
  }

  const url = new URL(`${supabaseUrl}/rest/v1/posts`);
  url.searchParams.set("select", "id,title,content,user_id,created_at");
  url.searchParams.set("id", `eq.${id}`);
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString(), {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch post", await res.text());
    notFound();
  }

  const data = await res.json();
  const post = Array.isArray(data) && data.length ? data[0] : null;

  if (!post) return notFound();

  return (
    <main className="min-h-screen p-6 flex items-start justify-center bg-slate-50 dark:bg-slate-900">
      <article className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          <span>{post.user_id}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.created_at}>{post.created_at}</time>
        </div>
        <div className="prose prose-slate dark:prose-invert mb-6">{post.content}</div>
        {/* Actions (edit/delete) shown only if current user is author - client component */}
        <PostActions id={post.id} user_id={post.user_id} title={post.title} content={post.content} />
        <Link href="/posts" className="inline-block mt-4 text-sm text-blue-600 hover:underline">← 목록으로 돌아가기</Link>
      </article>
    </main>
  );
}
