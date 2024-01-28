import { useQuery } from "@tanstack/react-query";
import { getLandingArtList } from "@/api";

export const useGetLandingArtList = () => {
  return useQuery({
    queryKey: ["landing"],
    queryFn: () => getLandingArtList(),
  });
};
