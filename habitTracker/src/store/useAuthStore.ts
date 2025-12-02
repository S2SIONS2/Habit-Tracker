import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useAuthStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "authStore",
    }
  )
);

export const useSession = () => {
  const session = useAuthStore((store) => store.session);
  return session;
};
export const useIsSessionLoaded = () => {
  const isSessionLoaded = useAuthStore((store) => store.isLoaded);
  return isSessionLoaded;
};
export const useSetSession = () => {
  const setSession = useAuthStore((store) => store.actions.setSession);
  return setSession;
};
