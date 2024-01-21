import httpClient from "@/api/core";

export const getDetailInfo = (id: number) => {
  return httpClient.get(`/arts/${id}`);
};
