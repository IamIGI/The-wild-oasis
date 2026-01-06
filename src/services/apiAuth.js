import supabase, { supabaseUrl } from './supabase';

export async function signup({
  fullName,
  email,
  password,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error('Signup error', { cause: error });
  }

  return data;
}

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

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  //Update user primitive data
  const { data, error } = await supabase.auth.updateUser(
    updateData
  );

  if (error)
    throw new Error('update user error', { cause: error });
  if (!avatar) return data;

  const fileName = `avatar-${
    data.user.id
  }-${Math.random()}`;

  //Upload image to bucket
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError)
    throw new Error('update image user error', {
      cause: storageError,
    });

  //Update avatar in DB
  const { data: updatedUser, error: errorUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (errorUser)
    throw new Error('update image user into table error', {
      cause: error,
    });
  return updatedUser;
}

// https://bxmaltcawkcfynthgfkk.supabase.co/storage/v1/object/public/avatars/cabin-002.jpg
// https://bxmaltcawkcfynthgfkk.supabase.co/storage/v1/object/avatars/avatar-804457dd-624f-453c-8ea1-97689f30ed91-0.617581417395858
