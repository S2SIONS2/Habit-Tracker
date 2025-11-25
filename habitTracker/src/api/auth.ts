import supabase from "@/lib/supabase";

// 회원가입
export async function signUp({
  email,
  password,
  name,
  phone,
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        name: name,
        phone: phone,
      },
    },
  });

  if (error) throw error;
  return data;
}

// 로그인(패스워드)
export async function pwLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}
