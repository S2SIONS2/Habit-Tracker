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

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentDate, "MMMM dd, yyyy")}
          </h2>
          <p className="text-gray-500 font-medium">
            {format(currentDate, "EEEE")}
          </p>
        </div>
        {isTodayDate && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            Today
          </span>
        )}
      </div>

      <div className="flex-1 p-4">
        {/* Placeholder for daily schedule/habits */}
        <div className="space-y-4">
          {filteredDailyTasks?.length === 0 ? (
            <div className="w-full p-4 border rounded-lg bg-gray-50 text-center text-gray-500">
              No habits scheduled for this day yet.
              <button
                className="text-blue-600 hover:underline cursor-pointer ml-2"
                onClick={() =>
                  openModal(
                    <AddHabit
                      selectedDate={currentDate.toISOString().split("T")[0]}
                    />
                  )
                }
              >
                Add a habit
              </button>
            </div>
          ) : (
            filteredDailyTasks?.map((task) => (
              <div
                key={task.id}
                className="w-full p-4 border rounded-lg bg-gray-50 text-center text-gray-500"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={task.is_done} />
                  <p>{task.name}</p>
                </div>
              </div>
            ))
          )}
          {/* Example time slots or habit list could go here */}
        </div>
      </div>
    </div>
  );
}
