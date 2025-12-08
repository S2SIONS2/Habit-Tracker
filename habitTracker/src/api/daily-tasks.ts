import supabase from "@/lib/supabase";

// get
export async function getDailyTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("daily_tasks")
    .select()
    .eq("user_id", user.id);

  if (error) throw error;
  return { data, status: 200 };
}

// post
export async function createDailyTask({
  name,
  is_done,
  task_date,
}: {
  name: string;
  is_done: boolean;
  task_date: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("daily_tasks")
    .insert({
      user_id: user.id,
      name: name,
      is_done: is_done,
      task_date: task_date,
    })
    .select()
    .single();

  if (error) throw error;
  return { data, status: 201 };
}
