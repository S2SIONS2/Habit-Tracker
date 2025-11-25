import { Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import CalendarPage from "./pages/calendar";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
}
