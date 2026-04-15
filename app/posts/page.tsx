import PostsClient from "@/app/components/PostsClient";

type PostShape = {
  id: number | string;
  title: string;
  content: string;
  author: string;
  date: string;
};

async function fetchPosts(): Promise<PostShape[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=20");
  const data = await res.json();
  return data.map((p: any) => ({
    id: p.id,
    title: p.title,
    content: p.body,
    author: `User ${p.userId}`,
    date: new Date().toISOString(),
  }));
}

export default async function PostsPage() {
  const initialPosts = await fetchPosts();

  return <PostsClient initialPosts={initialPosts} />;
}
