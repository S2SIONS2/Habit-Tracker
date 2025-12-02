import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import CalendarPage from "./pages/calendar";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GuestOnlyLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<MemberOnlyLayout />}>
        <Route path="/" element={<CalendarPage />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
