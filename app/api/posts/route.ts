import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("[api/posts] handling POST");
    const body = await req.json();
    console.log("[api/posts] body:", body);
    const { title, content } = body as { title?: string; content?: string };

    if (!title || !content) {
      return new NextResponse("Invalid", { status: 400 });
    }

    // Read Supabase config
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log("[api/posts] supabaseUrl present:", !!supabaseUrl, "supabaseKey present:", !!supabaseKey);
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars not set");
      return new NextResponse("Supabase not configured", { status: 500 });
    }

    // Validate Authorization bearer token and resolve user via Supabase Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const accessToken = authHeader.split(" ")[1];

    // Use anon key to call /auth/v1/user to validate token
    console.log("[api/posts] validating token at", `${supabaseUrl}/auth/v1/user`);
    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: supabaseKey,
      },
      cache: "no-store",
    });

    if (!userResp.ok) {
      const t = await userResp.text();
      console.warn("Auth validation failed:", t);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const authUser = await userResp.json();
    console.log("[api/posts] authUser:", authUser);
    const user_id = authUser?.id;
    if (!user_id) {
      return new NextResponse("Unauthorized: no user", { status: 401 });
    }

    const url = new URL(`${supabaseUrl}/rest/v1/posts`);

    const payload: any = { title: title.trim(), content: content.trim(), user_id };

    // Prefer service role key for inserts if available
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
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
