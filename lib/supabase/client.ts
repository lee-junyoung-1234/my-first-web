"use client";

// For local build and test we provide a minimal mock supabase client so the
// app can compile without a real Supabase configuration. Replace with a live
// client (createBrowserClient) when real NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY are available during development or deployment.

const supabase = {
	auth: {
		getUser: async () => ({ data: { user: null } }),
		onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
		signInWithPassword: async () => ({ error: { message: "Supabase not configured" } }),
		signUp: async () => ({ error: { message: "Supabase not configured" } }),
		signOut: async () => ({ error: { message: "Supabase not configured" } }),
	},
};

export { supabase };
export default supabase;
