import httpClient from "@/api/core";
import type { RequestData } from "@/api/core";
import type { ArtInfo } from "@/api/detail";

export interface LandingArtListResponseData extends RequestData {
  data: LandingList;
}

export interface LandingList {
  hotRanking: ArtInfo[];
  ticketOpen: ArtInfo[];
}

export const getLandingArtList = async () => {
  const response = await httpClient.get<LandingArtListResponseData>(`/arts`);

  return response.data;
};
