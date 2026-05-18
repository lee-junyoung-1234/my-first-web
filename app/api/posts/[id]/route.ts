import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body as { title?: string; content?: string };

    if (!title && !content) {
      return new NextResponse("Invalid", { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);
    url.searchParams.set("id", `eq.${id}`);

    const payload: any = {};
    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;

    const res = await fetch(url.toString(), {
      method: "PATCH",
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
      console.error("Supabase PATCH failed:", text);
      return new NextResponse(text || "Supabase error", { status: res.status });
    }

    const data = await res.json();
    const updated = Array.isArray(data) && data.length ? data[0] : null;
    return NextResponse.json({ ok: true, post: updated });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);
    url.searchParams.set("id", `eq.${id}`);

    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase DELETE failed:", text);
      return new NextResponse(text || "Supabase error", { status: res.status });
    }

    const data = await res.json();
    const deleted = Array.isArray(data) && data.length ? data[0] : null;
    return NextResponse.json({ ok: true, post: deleted });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}
