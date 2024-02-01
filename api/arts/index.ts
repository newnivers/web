import type { ResponseForm } from "@/types";
import type { Art } from "@/types/arts";
import httpClient from "../core";

export const getCheckList = async (): Promise<ResponseForm<Art[]>> => {
  return httpClient.get("/arts/check-list");
};
