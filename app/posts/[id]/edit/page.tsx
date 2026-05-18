import { notFound } from "next/navigation";
import PostForm from "@/app/components/PostForm";

type Props = {
  params: { id: string };
};

export default async function EditPage({ params }: Props) {
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
    console.error("Failed to fetch post for edit", await res.text());
    notFound();
  }

  const data = await res.json();
  const post = Array.isArray(data) && data.length ? data[0] : null;
  if (!post) return notFound();

  // render client PostForm in edit mode with initial values
  return (
    <main className="min-h-screen p-6 flex items-start justify-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
        {/* PostForm is a client component; pass initialValues for edit */}
        {/* initialValues must match Ch8 schema: id, title, content, user_id, created_at */}
        {/* @ts-ignore server -> client prop */}
        <PostForm mode="edit" initialValues={post} />
      </div>
    </main>
  );
}
