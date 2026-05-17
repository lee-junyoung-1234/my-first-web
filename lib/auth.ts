import supabase from "./supabase/client";

export async function signInWithEmail(email: string, password: string) {
  const res: any = await (supabase.auth as any).signInWithPassword({ email, password });
  const { data, error } = res ?? {};
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const res: any = await (supabase.auth as any).signUp({ email, password, options: { data: { name } } });
  const { data, error } = res ?? {};
  return { data, error };
}

export async function signOut() {
  const res: any = await (supabase.auth as any).signOut();
  const { error } = res ?? {};
  return { error };
}

export default { signInWithEmail, signUpWithEmail, signOut };
