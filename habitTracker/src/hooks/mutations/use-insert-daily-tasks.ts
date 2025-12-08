import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDailyTask } from "@/api/daily-tasks";
import type { UseMutationCallback } from "@/types/react-query";
import { useModalStore } from "@/store/useModalStore";

export function useInsertDailyTasks(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: createDailyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-tasks"],
      });
      closeModal();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
