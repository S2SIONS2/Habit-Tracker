import { useModalStore } from "@/store/useModalStore";
import { format, isToday } from "date-fns";
import AddHabit from "../habit/add-habit";
import type { DailyTask } from "@/types/daily-tasks";

export default function DayCalendar({
  currentDate,
  dailyTasks,
}: {
  currentDate: Date;
  dailyTasks?: DailyTask[];
}) {
  const isTodayDate = isToday(currentDate);
  const { openModal } = useModalStore();

  const filteredDailyTasks = dailyTasks?.filter(
    (task) => task.task_date.slice(0, 10) === format(currentDate, "yyyy-MM-dd")
  );

  const selectedDate = format(currentDate, "yyyy-MM-dd");

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-linear-to-r from-rose-50/50 to-teal-50/50">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <span className="text-rose-500">{format(currentDate, "MMMM")}</span>
            <span className="text-teal-500">{format(currentDate, "dd")}</span>
            <span className="text-amber-400 text-xl">
              , {format(currentDate, "yyyy")}
            </span>
          </h2>
          <p className="text-gray-500 font-medium ml-1 text-lg">
            {format(currentDate, "EEEE")}
          </p>
        </div>
        {isTodayDate && (
          <span className="px-4 py-1.5 bg-rose-100 text-rose-600 font-bold rounded-full shadow-sm animate-pulse">
            Today
          </span>
        )}
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-3">
          {filteredDailyTasks?.length === 0 ? (
            <div className="w-full py-12 px-4 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 text-center flex flex-col items-center justify-center gap-3">
              <div className="text-4xl">🍃</div>
              <p className="text-gray-500 font-medium">
                No habits scheduled for this day yet.
              </p>
              <button
                className="px-6 py-2 bg-rose-400 text-white rounded-full font-bold shadow-md hover:bg-rose-500 hover:shadow-lg transition-all active:scale-95"
                onClick={() =>
                  openModal(<AddHabit selectedDate={selectedDate} />)
                }
              >
                Add a habit ✨
              </button>
            </div>
          ) : (
            filteredDailyTasks?.map((task) => (
              <div
                key={task.id}
                className={`
                  w-full p-4 border rounded-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg
                  flex items-center gap-4 bg-white shadow-sm group
                  ${
                    task.is_done
                      ? "border-green-200 bg-green-50/30"
                      : "border-rose-100"
                  }
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner
                    ${
                      task.is_done
                        ? "bg-green-100 text-green-600"
                        : "bg-rose-100 text-rose-500"
                    }
                  `}
                >
                  {task.is_done ? "🎉" : "📝"}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg ${
                      task.is_done
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task.name}
                  </h3>
                  {/* Additional task details or time could go here */}
                </div>

                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${task.is_done 
                    ? 'border-green-500 bg-green-500 text-white' 
                    : 'border-gray-200 group-hover:border-rose-300'
                  }
                "
                >
                  {task.is_done && "✓"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
