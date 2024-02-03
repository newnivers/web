import httpClient from "@/api/core";

export const postReservation = (id: number, quantity: number) => {
  return httpClient.post(`/art_schedules/${id}/reserve_tickets`, {
    data: { quantity },
  });
};
