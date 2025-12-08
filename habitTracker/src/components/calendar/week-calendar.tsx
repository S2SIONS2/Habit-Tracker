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

  const dayColors = [
    "text-rose-400",
    "text-orange-400",
    "text-amber-400",
    "text-green-400",
    "text-teal-400",
    "text-blue-400",
    "text-indigo-400",
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8f1db] backdrop-blur-sm rounded-xl border border-white/50 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 flex-1 gap-2 p-2">
        {weekDays.map((day, idx) => {
          const isSelected = isSameDay(day, currentDate);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`
                flex flex-col items-center py-3 px-1 transition-all duration-300 rounded-2xl border-2
                ${
                  isSelected
                    ? "bg-white/70 border-rose-200 shadow-md scale-[1.02] z-10"
                    : "bg-white/70 border-transparent hover:border-rose-100 hover:shadow-sm hover:-translate-y-0.5"
                }
              `}
            >
              <span className={`text-xs font-bold mb-2 ${dayColors[idx % 7]}`}>
                {format(day, "EEE")}
              </span>
              <span
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-sm mb-3 transition-colors
                  ${
                    isTodayDate
                      ? "bg-linear-to-tr from-rose-400 to-rose-300 text-white shadow-rose-200"
                      : isSelected
                      ? "bg-rose-100 text-rose-600"
                      : "bg-gray-50 text-gray-700"
                  }
                `}
              >
                {format(day, "d")}
              </span>

              <div className="w-full flex flex-col gap-1.5 px-1 overflow-y-auto custom-scrollbar">
                {dailyTasks
                  ?.filter(
                    (task) =>
                      task.task_date.slice(0, 10) === format(day, "yyyy-MM-dd")
                  )
                  .map((task, taskIdx) => (
                    <div
                      key={task.id}
                      className={`
                        group flex items-center gap-1.5 p-1.5 rounded-lg border border-transparent hover:border-rose-100 hover:bg-rose-50/50 transition-colors
                        bg-white shadow-sm
                      `}
                    >
                      <div
                        className={`
                        w-1.5 h-1.5 rounded-full shrink-0
                        ${taskIdx % 3 === 0 ? "bg-teal-300" : ""}
                        ${taskIdx % 3 === 1 ? "bg-amber-300" : ""}
                        ${taskIdx % 3 === 2 ? "bg-violet-300" : ""}
                      `}
                      />
                      <span className="text-[10px] sm:text-xs font-medium text-gray-600 truncate group-hover:text-rose-600">
                        {task.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
