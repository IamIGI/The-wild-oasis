import supabase from './supabase';

export async function login({ email, password }) {
  let { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error('Login error', { cause: error });
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError)
    throw new Error('Login error', { cause: sessionError });
  if (!session?.session) return null;

  const { data: user, error: userError } =
    await supabase.auth.getUser();

  if (userError)
    throw new Error('Login error', { cause: userError });

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error)
    throw new Error('Logout error', { cause: error });
}
