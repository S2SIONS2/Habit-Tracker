import Calendar from "@/components/calendar/calendar";
import { useGetDailyTasks } from "@/hooks/queries/use-get-daily-tasks";

export default function CalendarPage() {
  const { data } = useGetDailyTasks();

  return (
    <>
      <Calendar dailyTasks={data || []} />
    </>
  );
}
