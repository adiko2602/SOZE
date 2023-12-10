import { useMutation, useQuery } from "@tanstack/react-query";
import { requests } from "../../api/apiRequest";
import { TProfileForm, TSignUpForm } from "../../types";

export function useGetProfileByIdQuery({
  profileId,
}: {
  profileId: number | undefined;
}) {
  return useQuery({
    queryKey: ["useGetProfileByIdQuery"],
    queryFn: () => requests.get<TProfileForm>(`/api/profile/${profileId}`),
    enabled: profileId ? true : false,
  });
}
