import httpClient from "@/api/core";
import type { RequestData } from "@/api/core";
import type { ArtInfo } from "@/api/detail";

export interface LandingArtListResponseData extends RequestData {
  data: LandingList;
}

export interface TicketShowingPageResponseData extends RequestData {
  data: ShowingList;
}

export interface TicketHomePageResponseData extends RequestData {
  data: TicketHome;
}

interface ShowingList {
  showing: ArtInfo[];
}

export interface LandingList {
  hotRanking: ArtInfo[];
  ticket: ArtInfo[];
}

export interface TicketHome {
  hotRanking: ArtInfo[];
  ticketOpen: ArtInfo[];
}

export const getLandingArtList = async () => {
  const response = await httpClient.get<LandingArtListResponseData>(
    `/arts/main`
  );

  return response.data;
};

export const getTicketHomeList = async () => {
  const response = await httpClient.get<TicketHomePageResponseData>(
    `/arts/home`
  );

  return response.data;
};

export const getTicketShowingList = async () => {
  const response = await httpClient.get<TicketShowingPageResponseData>(
    `/arts/showing `
  );

  return response.data;
};
