import { signOut } from "@/api/auth";
import { useState } from "react";
// import { useNavigate } from "react-router";

type NavKey =
  | "overview"
  | "calendar"
  | "focus"
  | "stats"
  | "settings"
  | "logout";

interface NavItem {
  key: NavKey;
  label: string;
  section: "top" | "middle" | "bottom";
}

const NAV_ITEMS: NavItem[] = [
  { key: "overview", label: "Overview", section: "middle" },
  { key: "calendar", label: "Calendar", section: "middle" },
  { key: "focus", label: "Focus", section: "middle" },
  { key: "stats", label: "Stats", section: "middle" },
  { key: "settings", label: "Settings", section: "bottom" },
  { key: "logout", label: "Logout", section: "bottom" },
];

export default function MemberNav() {
  // 그냥 데모용 active 상태 (나중에 라우터랑 연결해서 바꿔 써도 됨)
  const [activeKey, setActiveKey] = useState<NavKey>("calendar");

  // const nav = useNavigate();

  function handleClick(key: NavKey) {
    switch (key) {
      case "logout":
        signOut();
        break;
    }
  }

  return (
    <aside className="w-[120px] h-screen shrink-0 sm:w-20 lg:w-24 flex items-center justify-center ">
      <nav className="w-[90px] h-[95%] flex flex-col items-center py-6 rounded-[2vw] bg-slate-950 text-slate-100">
        {/* 로고 영역 */}
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/90 shadow-lg">
          {/* 작은 책/체크 아이콘 느낌 */}
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <path d="M9 8h6" />
            <path d="M9 12h3" />
            <path d="M9 16h4" />
          </svg>
        </div>

        {/* 메인 아이콘들 */}
        <div className="flex flex-1 flex-col items-center gap-3">
          {NAV_ITEMS.filter((i) => i.section === "middle").map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveKey(item.key)}
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-150",
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
                    : "bg-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white",
                ].join(" ")}
              >
                <span className="sr-only">{item.label}</span>
                {getIcon(item.key, isActive)}
              </button>
            );
          })}
        </div>

        {/* 하단 아이콘들 (설정 / 로그아웃 등) */}
        <div className="mt-4 flex flex-col items-center gap-3">
          {NAV_ITEMS.filter((i) => i.section === "bottom").map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  handleClick(item.key);
                  setActiveKey(item.key);
                }}
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-150",
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
                    : "bg-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white",
                ].join(" ")}
              >
                <span className="sr-only">{item.label}</span>
                {getIcon(item.key, isActive)}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

function getIcon(key: NavKey, active: boolean) {
  const stroke = "currentColor";

  switch (key) {
    case "overview":
      // 대시보드 느낌
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      );
    case "calendar":
      // 캘린더 (메인)
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="17" rx="3" />
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <circle cx="9" cy="15" r="1.4" />
          <circle cx="15" cy="15" r="1.4" />
        </svg>
      );
    case "focus":
      // 집중 모드 / 지구본 느낌 (습관 포커스)
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
          <path d="M12 4a9 9 0 0 1 0 16" />
          <path d="M12 4a9 9 0 0 0 0 16" />
        </svg>
      );
    case "stats":
      // 통계
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20v-6" />
          <path d="M10 20v-10" />
          <path d="M16 20v-4" />
          <path d="M22 20V8" />
        </svg>
      );
    case "settings":
      // 설정
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.8 1.8 0 0 0 .3 2l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.8 1.8 0 0 0-2-.3 1.8 1.8 0 0 0-1 .9 1.8 1.8 0 0 0-.2 1.1A2 2 0 0 1 9 22a2 2 0 0 1-1.7-3 1.8 1.8 0 0 0-.2-1.1 1.8 1.8 0 0 0-1-.9 1.8 1.8 0 0 0-2 .3l-.1.1A2 2 0 1 1 1.2 17l.1-.1a1.8 1.8 0 0 0 .3-2 1.8 1.8 0 0 0-1-.9A2 2 0 0 1 2 9.1a1.8 1.8 0 0 0 1-.9 1.8 1.8 0 0 0-.3-2l-.1-.1A2 2 0 1 1 5.4 3l.1.1a1.8 1.8 0 0 0 2 .3 1.8 1.8 0 0 0 1-.9A2 2 0 0 1 15 2a2 2 0 0 1 1.7 3 1.8 1.8 0 0 0 1 .9 1.8 1.8 0 0 0 2-.3l.1-.1A2 2 0 1 1 22.8 7l-.1.1a1.8 1.8 0 0 0-.3 2 1.8 1.8 0 0 0 1 .9A2 2 0 0 1 22 15a1.8 1.8 0 0 0-1 .9Z" />
        </svg>
      );
    case "logout":
      // 로그아웃
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
          <path d="M17 16l4-4-4-4" />
          <path d="M11 12h10" />
        </svg>
      );
    default:
      return null;
  }
}
