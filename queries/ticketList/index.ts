import { useQuery } from "@tanstack/react-query";
import {
  getLandingArtList,
  getTicketShowingList,
  getTicketHomeList,
} from "@/api";

export const useGetLandingArtList = () => {
  return useQuery({
    queryKey: ["ticketList"],
    queryFn: () => getLandingArtList(),
  });
};

export const useGetTicketHomeList = () => {
  return useQuery({
    queryKey: ["ticketHome"],
    queryFn: () => getTicketHomeList(),
  });
};

export const useGetTicketShowingList = () => {
  return useQuery({
    queryKey: ["ticketShowing"],
    queryFn: () => getTicketShowingList(),
  });
};
