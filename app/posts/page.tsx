import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">블로그</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block p-4 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{post.author} · {post.date}</p>
            <p className="mt-3 text-gray-600">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
