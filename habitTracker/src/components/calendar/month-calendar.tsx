import {
  format, // date formatting
  startOfMonth, // 달력 첫날
  endOfMonth, // 달력 마지막날
  startOfWeek, // 주의 첫날
  endOfWeek, // 주의 마지막날
  eachDayOfInterval, // 주어진 날짜 사이의 모든 날짜 반환
  isSameMonth, // 두 날짜가 같은 달인지 확인
  isSameDay, // 두 날짜가 같은 날짜인지 확인
  isToday, // 현재 날짜 확인
  addMonths, // 주어진 날짜에 지정된 달 수 더함
  subMonths, // 주어진 날짜에 지정된 달 수 뺌
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DailyTask } from "@/types/daily-tasks";

type ViewMode = "month" | "day";
interface MonthCalendarProps {
  currentDate: Date;
  dailyTasks?: DailyTask[];
  onNavigate?: (date: Date) => void;
  setCurrentDate?: (date: Date) => void;
  setViewMode?: (viewMode: ViewMode) => void;
}

// Assuming TaskBadge is a component that needs to be rendered for each task.
// If TaskBadge is not defined elsewhere, this would need to be a simple div or imported.
// For the purpose of this edit, we'll assume it's a component that takes `key` and `title` props.
// If it's a simple div, it would look like:
// <div key={task.id} className="text-[10px] leading-tight truncate bg-blue-100 text-blue-800 px-1 rounded" title={task.name}>
//   {task.name}
// </div>
// Since the user provided `title={task.name}`, I'll assume a component named TaskBadge.
const TaskBadge = ({ title }: { title: string }) => (
  <div
    className="group flex items-center gap-1.5 p-1.5 rounded-lg border border-transparent hover:border-rose-100 hover:bg-rose-50/50 transition-colors bg-white shadow-sm"
    title={title}
  >
    {title}
  </div>
);

export default function MonthCalendar({
  currentDate, // 현재 날짜
  dailyTasks, // 일일 태스크
  onNavigate, // 날짜 이동
  setViewMode, // 달력 뷰 모드 변경
  setCurrentDate, // 현재 날짜 변경
}: MonthCalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = [
    { label: "Sun", color: "text-rose-400" },
    { label: "Mon", color: "text-orange-400" },
    { label: "Tue", color: "text-amber-400" },
    { label: "Wed", color: "text-green-400" },
    { label: "Thu", color: "text-teal-400" },
    { label: "Fri", color: "text-blue-400" },
    { label: "Sat", color: "text-indigo-400" },
  ];

  const handlePrevMonth = () => {
    if (onNavigate) {
      onNavigate(subMonths(currentDate, 1));
    }
  };

  const handleNextMonth = () => {
    if (onNavigate) {
      onNavigate(addMonths(currentDate, 1));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f1db] backdrop-blur-sm rounded-3xl border-2 border-white shadow-xl overflow-hidden">
      <div className="p-6 flex items-center justify-between bg-linear-to-r from-rose-50 to-teal-50">
        <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
          <span className="text-rose-500">{format(currentDate, "MMMM")}</span>{" "}
          <span className="text-teal-500">{format(currentDate, "yyyy")}</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white/80 rounded-2xl transition-all hover:shadow-md active:scale-95 text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-white/80 rounded-2xl transition-all hover:shadow-md active:scale-95 text-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 pb-0 sm:p-4 sm:pb-0 bg-white/50">
        {weekDays.map((day) => (
          <div
            key={day.label}
            className={`w-[100px] m-auto flex-1 py-3 text-center text-sm font-bold ${day.color} bg-white rounded-xl shadow-sm border border-gray-100/50 border-rose-300`}
          >
            {day.label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 sm:p-4 h-full bg-white/50">
        {calendarDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, currentDate);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`
                flex flex-col p-2 min-h-[60px] transition-all duration-300 relative group
                rounded-2xl border-2
                ${
                  !isCurrentMonth
                    ? "bg-gray-50/50 border-transparent opacity-50 text-gray-400"
                    : isSelected
                    ? "bg-yellow-50 border-rose-200 ring-2 ring-rose-100 shadow-md z-10 scale-[1.02]"
                    : "bg-white/70 border-transparent hover:border-rose-100 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
              <div className="flex justify-center mb-1">
                <span
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-transform
                    ${
                      isTodayDate
                        ? "bg-linear-to-tr from-rose-400 to-rose-300 text-white shadow-lg shadow-rose-200"
                        : isSelected
                        ? "bg-rose-100 text-rose-600"
                        : "text-gray-600 group-hover:bg-gray-100"
                    }
                  `}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                {dailyTasks
                  ?.filter(
                    (task) =>
                      task.task_date.slice(0, 10) === format(day, "yyyy-MM-dd")
                  )
                  .slice(0, 3) // Show max 3 tasks
                  .map((task) => (
                    <TaskBadge
                      key={task.id} // Assuming task has a unique 'id'
                      title={task.name}
                    />
                  ))}
                {dailyTasks &&
                  dailyTasks.filter(
                    (task) =>
                      task.task_date.slice(0, 10) === format(day, "yyyy-MM-dd")
                  ).length > 3 && (
                    <div className="text-[10px] text-gray-400 text-center leading-none">
                      <button
                        type="button"
                        className="text-rose-500 hover:text-rose-600 w-full cursor-pointer text-xl"
                        onClick={() => {
                          setCurrentDate(day);
                          setViewMode("day");
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
