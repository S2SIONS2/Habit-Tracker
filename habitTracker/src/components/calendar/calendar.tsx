import { useState } from "react";
import {
  addWeeks, // 주어진 날짜에 지정된 주 수 더함
  subWeeks, // 주어진 날짜에 지정된 주 수 뺌
  isSameMonth, // 두 날짜가 같은 달인지 확인
  startOfMonth, // 주어진 날짜의 달의 첫 날짜 반환
  addDays, // 주어진 날짜에 지정된 일 수 더함
  subDays, // 주어진 날짜에 지정된 일 수 뺌
} from "date-fns";
import WeekCalendar from "./week-calendar";
import MonthCalendar from "./month-calendar";
import DayCalendar from "./day-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DailyTask } from "@/types/daily-tasks";
import { useModalStore } from "@/store/useModalStore";
import AddHabit from "../habit/add-habit";

type ViewMode = "month" | "day";

export default function Calendar({ dailyTasks }: { dailyTasks?: DailyTask[] }) {
  const [currentDate, setCurrentDate] = useState(() => new Date()); // 현재 날짜
  const [viewMode, setViewMode] = useState<ViewMode>("month"); // 보여줄 달력 모드(월/일)

  const { openModal } = useModalStore();

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
    if (isSameMonth(newDate, new Date())) {
      // 현재 날짜와 같은 달이면
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
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-sans">
      {/* Global Header */}
      <header className="flex items-center justify-between px-6 py-4 mx-4 mt-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            My <span className="text-rose-400">Habit Calendar</span>
          </h1>
          <button
            className="ml-4 bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gray-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            onClick={() => openModal(<AddHabit />)}
          >
            <span>+</span> Add Habit
          </button>
        </div>
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-gray-100/80 p-1 rounded-full border border-gray-200/50">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${
                viewMode === "month"
                  ? "bg-white text-rose-500 shadow-md transform scale-105"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${
                viewMode === "day"
                  ? "bg-white text-rose-500 shadow-md transform scale-105"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Day
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300/50" />

          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-5 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-full transition-colors shadow-sm"
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
            <div className="flex-[2] min-h-0 bg-transparent rounded-3xl overflow-hidden shadow-none">
              <MonthCalendar
                currentDate={currentDate}
                dailyTasks={dailyTasks}
                onNavigate={handleMonthNavigate}
                setViewMode={setViewMode}
                setCurrentDate={setCurrentDate}
              />
            </div>

            {/* Bottom: Week Calendar (1/3 height) */}
            <div className="flex-1 min-h-0 flex flex-col bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 shadow-md overflow-hidden">
              {/* Week Navigation Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-rose-100/50 shrink-0 bg-linear-to-r from-rose-50/30 to-teal-50/30">
                <span className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  Weekly Habits
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleWeekNavigate("prev")}
                    className="p-1.5 hover:bg-white rounded-xl transition-all hover:shadow-xs text-gray-500 hover:text-rose-500"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWeekNavigate("next")}
                    className="p-1.5 hover:bg-white rounded-xl transition-all hover:shadow-xs text-gray-500 hover:text-rose-500"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Week View */}
              <div className="flex-1 overflow-y-auto p-2">
                <WeekCalendar
                  currentDate={currentDate}
                  dailyTasks={dailyTasks}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl overflow-hidden flex flex-col">
            {/* Day Navigation Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-rose-100/50 shrink-0 bg-linear-to-r from-rose-50/50 to-teal-50/50">
              <span className="text-sm font-bold text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Daily Detail
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDayNavigate("prev")}
                  className="p-1.5 hover:bg-white rounded-xl transition-all hover:shadow-xs text-gray-500 hover:text-rose-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDayNavigate("next")}
                  className="p-1.5 hover:bg-white rounded-xl transition-all hover:shadow-xs text-gray-500 hover:text-rose-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto relative">
              {/* Decorative background elements */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

              <DayCalendar currentDate={currentDate} dailyTasks={dailyTasks} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
