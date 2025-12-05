import supabase from "@/lib/supabase";

export async function createDailyTask({
    user_id,
    name,
    is_done,
    task_date,
}: {
    user_id: string;
    name: string;
    is_done: boolean;
    task_date: string;
}) {
    const { data, error } = await supabase.from("daily_tasks").insert({
        user_id,
        name,
        is_done,
        task_date,
    });

    if (error) throw error;
    return data;
}