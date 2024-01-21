import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getDetailInfo } from "@/api";

export const useTicketDetail = (id: number) => {
  const { data } = useQuery(["detail", id], () => getDetailInfo(id));

  const rowInfos = useMemo(() => {
    return data
      ? {
          place: data.place,
          startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
          endDate: data.endDate,
          ageLimit: data.ageLimit,
          runningTime: data.runningTime,
          interMission: data.interMission,
          price: Number(data.price),
        }
      : null;
  }, [data]);

  return { data, rowInfos };
};
