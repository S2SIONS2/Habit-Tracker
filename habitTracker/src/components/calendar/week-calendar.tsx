import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";
import type { DailyTask } from "@/types/daily-tasks";

export default function WeekCalendar({
  currentDate,
  dailyTasks,
}: {
  currentDate: Date;
  dailyTasks?: DailyTask[];
}) {
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);

  const weekDays = eachDayOfInterval({
    start,
    end,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      <div className="grid grid-cols-7 flex-1">
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, currentDate);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`
                flex flex-col items-center py-4 border-r last:border-r-0 transition-colors hover:bg-gray-50
                ${isSelected ? "bg-blue-50" : ""}
              `}
            >
              <span className="text-sm font-medium text-gray-500 mb-2">
                {format(day, "EEE")}
              </span>
              <span
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full text-lg
                  ${
                    isTodayDate
                      ? "bg-blue-600 text-white font-bold"
                      : isSelected
                      ? "text-blue-600 font-bold"
                      : "text-gray-900"
                  }
                `}
              >
                {format(day, "d")}
              </span>

              {/* Placeholder for habits/events */}
              <div className="mt-4 w-full px-2 space-y-1">
                {/* <div className="h-1.5 w-full bg-blue-100 rounded-full" /> */}
                <ul>
                  {dailyTasks
                    ?.filter(
                      (task) =>
                        task.task_date.slice(0, 10) ===
                        format(day, "yyyy-MM-dd")
                    )
                    .map((task) => (
                      <li key={task.id}>
                        <span className="text-xs text-gray-500">
                          {task.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
