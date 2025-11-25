import { signUp } from "@/api/auth";
import type { UseMutationCallback } from "@/types/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignUp(callbacks?: UseMutationCallback) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
