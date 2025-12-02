import { useSession } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const session = useSession();
  if (!session) return <Navigate to={"/login"} replace={true} />;

  return <Outlet />;
}
