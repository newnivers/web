import httpClient from "@/api/core";
import type { RequestData } from "@/api/core";

export interface DetailResponseData extends RequestData {
  data: ArtInfo;
}

export interface ArtInfo {
  id: number;
  user?: number;
  place: string;
  title: string;
  image: string;
  genre: string;
  category: ArtCategory;
  status?: ArtStatus;
  runningTime: number;
  ageLimit: number;
  interMission: number;
  description: string;
  cautionDescription: string;
  csPhoneNumber?: string;
  reservedSeat?: boolean;
  startDate: string;
  endDate: string;
  isFree?: boolean;
  purchaseLimitCount?: number;
  price: string;
  schedules: Schedule[];
  comments?: CommentInfo[];
  ticketOpenAt: string;
  ticketCloseAt: string;
  createdAt?: string;
  updatedAt?: string;
  seatMaxCount?: number;
}

export interface Schedule {
  id: number;
  startAt: string;
  endAt: string;
  seatCount: number;
}

export type ArtCategory = "EXHIBITION" | "SHOW";

export type ArtStatus = "PENDING" | "REJECTED" | "APPROVED";

export type CommentInfo = {
  author: number;
  art: number;
  description: string;
  score: number;
};

export const getDetailInfo = async (id: number) => {
  const response = await httpClient.get<DetailResponseData>(`/arts/${id}`);

  return response.data;
};
