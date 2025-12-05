import { useState } from "react";
import { 
  addWeeks, // 주어진 날짜에 지정된 주 수 더함
  subWeeks, // 주어진 날짜에 지정된 주 수 뺌
  isSameMonth, // 두 날짜가 같은 달인지 확인
  startOfMonth, // 주어진 날짜의 달의 첫 날짜 반환
  addDays, // 주어진 날짜에 지정된 일 수 더함
  subDays // 주어진 날짜에 지정된 일 수 뺌
} from "date-fns";
import WeekCalendar from "./week-calendar";
import MonthCalendar from "./month-calendar";
import DayCalendar from "./day-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ViewMode = "month" | "day";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date()); // 현재 날짜
  const [viewMode, setViewMode] = useState<ViewMode>("day"); // 보여줄 달력 모드(월/일)

  // Week Navigation (Main View)
  const handleWeekNavigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate((prev) => subWeeks(prev, 1));
    } else {
      setCurrentDate((prev) => addWeeks(prev, 1));
    }
  };

  // Month Navigation (Sidebar)
  const handleMonthNavigate = (newDate: Date) => {
    if (isSameMonth(newDate, new Date())) { // 현재 날짜와 같은 달이면
      setCurrentDate(new Date()); // 현재 날짜로 설정
    } else {
      setCurrentDate(startOfMonth(newDate)); // 해당 달의 첫 날짜로 설정
    }
  };

  // Day Navigation
  const handleDayNavigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate((prev) => subDays(prev, 1));
    } else {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Global Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === "month" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === "day" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Day
            </button>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            Today
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-4">
        {viewMode === "month" ? (
          <div className="flex flex-col h-full gap-4">
            {/* Top: Month Calendar (2/3 height) */}
            <div className="flex-[2] min-h-0 bg-white rounded-lg border shadow-sm overflow-hidden">
              <MonthCalendar 
                currentDate={currentDate} 
                onNavigate={handleMonthNavigate} 
              />
            </div>

            {/* Bottom: Week Calendar (1/3 height) */}
            <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
              {/* Week Navigation Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b shrink-0">
                <span className="text-sm font-medium text-gray-500">Weekly View</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleWeekNavigate("prev")}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleWeekNavigate("next")}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Week View */}
              <div className="flex-1 overflow-y-auto p-4">
                <WeekCalendar currentDate={currentDate} />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
             {/* Day Navigation Header */}
             <div className="flex items-center justify-between px-4 py-2 border-b shrink-0">
                <span className="text-sm font-medium text-gray-500">Daily View</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDayNavigate("prev")}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDayNavigate("next")}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            <div className="flex-1 overflow-y-auto">
              <DayCalendar currentDate={currentDate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
