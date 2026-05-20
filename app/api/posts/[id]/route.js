import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body || {};

    if (!title && !content) {
      return new NextResponse("Invalid", { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const accessToken = authHeader.split(" ")[1];

    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`, apikey: supabaseKey },
      cache: "no-store",
    });
    if (!userResp.ok) return new NextResponse("Unauthorized", { status: 401 });
    const authUser = await userResp.json();
    const requesterId = authUser?.id;
    if (!requesterId) return new NextResponse("Unauthorized", { status: 401 });

    const checkUrl = new URL(`${supabaseUrl}/rest/v1/posts`);
    checkUrl.searchParams.set("id", `eq.${id}`);
    checkUrl.searchParams.set("select", "id,user_id");
    const checkRes = await fetch(checkUrl.toString(), {
      method: "GET",
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey}` },
      cache: "no-store",
    });
    if (!checkRes.ok) {
      const t = await checkRes.text();
      console.error("Failed to fetch post for ownership check:", t);
      return new NextResponse("Failed to verify ownership", { status: 500 });
    }
    const rows = await checkRes.json();
    const existing = Array.isArray(rows) && rows.length ? rows[0] : null;
    if (!existing) return new NextResponse("Not found", { status: 404 });
    if (existing.user_id !== requesterId) return new NextResponse("Forbidden", { status: 403 });

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);
    url.searchParams.set("id", `eq.${id}`);

    const payload = {};
    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;

    const res = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey}`,
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
  } catch (err) {
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const accessToken = authHeader.split(" ")[1];

    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`, apikey: supabaseKey },
      cache: "no-store",
    });
    if (!userResp.ok) return new NextResponse("Unauthorized", { status: 401 });
    const authUser = await userResp.json();
    const requesterId = authUser?.id;
    if (!requesterId) return new NextResponse("Unauthorized", { status: 401 });

    const checkUrl = new URL(`${supabaseUrl}/rest/v1/posts`);
    checkUrl.searchParams.set("id", `eq.${id}`);
    checkUrl.searchParams.set("select", "id,user_id");
    const checkRes = await fetch(checkUrl.toString(), {
      method: "GET",
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey}` },
      cache: "no-store",
    });
    if (!checkRes.ok) {
      const t = await checkRes.text();
      console.error("Failed to fetch post for ownership check:", t);
      return new NextResponse("Failed to verify ownership", { status: 500 });
    }
    const rows = await checkRes.json();
    const existing = Array.isArray(rows) && rows.length ? rows[0] : null;
    if (!existing) return new NextResponse("Not found", { status: 404 });
    if (existing.user_id !== requesterId) return new NextResponse("Forbidden", { status: 403 });

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);
    url.searchParams.set("id", `eq.${id}`);

    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey}`,
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
  } catch (err) {
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}
