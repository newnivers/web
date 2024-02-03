import { useMutation } from "@tanstack/react-query";
import { postReservation } from "@/api";

export const usePostReservation = () => {
  return useMutation(({ id, quantity }: { id: number; quantity: number }) =>
    postReservation(id, quantity)
  );
};
