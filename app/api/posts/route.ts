import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, user_id } = body as { title?: string; content?: string; user_id?: string };

    if (!title || !content) {
      return new NextResponse("Invalid", { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);

    const payload: any = { title: title.trim(), content: content.trim() };
    if (user_id) payload.user_id = user_id;

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase INSERT failed:", text);
      return new NextResponse(text || "Supabase error", { status: res.status });
    }

    const data = await res.json();
    const created = Array.isArray(data) && data.length ? data[0] : data;
    return NextResponse.json({ ok: true, post: created });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}
