import { useSession } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";
import MemberNav from "../member-nav";

export default function MemberOnlyLayout() {
  const session = useSession();
  if (!session) return <Navigate to={"/login"} replace={true} />;

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <MemberNav />
      <main className="flex-1 px-4 py-6 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
