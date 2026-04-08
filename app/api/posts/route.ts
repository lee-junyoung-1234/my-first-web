import { posts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body as { title?: string; content?: string };

    if (!title || !content) {
      return new NextResponse("Invalid", { status: 400 });
    }

    const maxId = posts.length ? Math.max(...posts.map((p) => p.id)) : 0;
    const id = maxId + 1;
    const date = new Date().toISOString().slice(0, 10);

    posts.push({ id, title, content, author: "익명", date });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return new NextResponse("Server error", { status: 500 });
  }
}
