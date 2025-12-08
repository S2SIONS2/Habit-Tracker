import { getDailyTasks } from "@/api/daily-tasks";
import { useQuery } from "@tanstack/react-query";

export function useGetDailyTasks() {
  return useQuery({
    queryKey: ["daily-tasks"],
    queryFn: async () => {
      const { data } = await getDailyTasks();
      return data;
    },
  });
}
