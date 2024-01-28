import { useMutation } from "@tanstack/react-query";
import { postReservation } from "@/api";

export const usePostReservation = () => {
  return useMutation((id: number) => postReservation(id));
};
