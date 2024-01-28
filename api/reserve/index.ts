import httpClient from "@/api/core";

export const postReservation = (id: number) => {
  return httpClient.get(`/arts/tickets/${id}/reserve`);
};
