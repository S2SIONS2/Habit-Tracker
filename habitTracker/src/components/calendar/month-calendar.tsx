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
  isSameWeek, // 두 날짜가 같은 주인지 확인
  addMonths, // 주어진 날짜에 지정된 달 수 더함
  subMonths // 주어진 날짜에 지정된 달 수 뺌
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthCalendarProps {
  currentDate: Date;
  onNavigate?: (date: Date) => void;
}

export default function MonthCalendar({ currentDate, onNavigate }: MonthCalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ // 주어진 날짜 사이의 모든 날짜 반환
    start: startDate,
    end: endDate,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    <div className="flex flex-col h-full bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-sm font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 border-b bg-gray-50">
        {weekDays.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7">
        {calendarDays.map((day, dayIdx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, currentDate);
          const isTodayDate = isToday(day);
          const isCurrentWeek = isSameWeek(day, currentDate);

          return (
            <div
              key={day.toString()}
              className={`
                min-h-[40px] border-b border-r p-1 transition-colors relative
                ${!isCurrentMonth ? "bg-gray-50/50 text-gray-400" : "bg-white"}
                ${dayIdx % 7 === 0 ? "border-l-0" : ""} 
                ${dayIdx % 7 === 6 ? "border-r-0" : ""}
                ${isCurrentWeek ? "bg-blue-50/30" : ""}
              `}
            >
              {isCurrentWeek && (
                <div className="absolute inset-0 border-y-2 border-blue-100 pointer-events-none first:border-l-2 last:border-r-2" />
              )}
              
              <div className="flex justify-center items-center h-full relative z-10">
                <span
                  className={`
                    text-xs w-6 h-6 flex items-center justify-center rounded-full
                    ${isTodayDate 
                      ? "bg-blue-600 text-white font-semibold" 
                      : isSelected
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700"}
                  `}
                >
                  {format(day, "d")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
