import { pwLogin } from "@/api/auth";
import type { UseMutationCallback } from "@/types/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function usePwLogin(callbacks?: UseMutationCallback) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: pwLogin,
    onSuccess: () => {
      console.log("로그인 완료");
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
