import { format, isToday } from "date-fns";

export default function DayCalendar({ currentDate }: { currentDate: Date }) {
  const isTodayDate = isToday(currentDate);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentDate, "MMMM d, yyyy")}
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
          <div className="p-4 border rounded-lg bg-gray-50 text-center text-gray-500">
            No habits scheduled for this day yet.
          </div>
          {/* Example time slots or habit list could go here */}
        </div>
      </div>
    </div>
  );
}
