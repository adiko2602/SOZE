import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requests } from "../../api/apiRequest";
import { TProfileForm } from "../../types";

export function useProfileFormMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useProfileFormMutation"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["useGetProfileByIdQuery"],
      });
    },
    mutationFn: ({
      profileId,
      values,
    }: {
      profileId: number | undefined;
      values: TProfileForm;
    }) =>
      requests.patch<unknown, TProfileForm>(
        `/api/profile/${profileId}`,
        values
      ),
  });
}
