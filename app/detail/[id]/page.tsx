"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import {
  Genre,
  TicketMainInfo,
  ReservationCalendar,
} from "@/components/domains/detail";
import Tab from "@/components/domains/detail/tab";
import { useTicketDetail } from "@/queries";
import useAuthUserStorage from "../../../hooks/authUserStorage";

export default function DetailPage({ params }: { params: { id: string } }) {
  const { userAuth } = useAuthUserStorage();
  const artId = useMemo(() => Number(params.id), [params]);
  const { data, rowInfos } = useTicketDetail(Number(artId));
  const isDisabled = useMemo(() => {
    const ticketOpenDay = dayjs(data?.ticketOpenAt);

    return !(ticketOpenDay.diff(dayjs(), "day") < 0 && userAuth.id);
  }, [data]);

  if (!data || !rowInfos) {
    return <div></div>;
  }

  return (
    <SpacerSkleton id="main-content" type="vertical">
      <DetailHeader>
        <Genre genre={data.genre} />
        <TicketTitle typo="headline">{data.title}</TicketTitle>
      </DetailHeader>
      <DetailContent>
        <DetailInfoWrapper>
          <TicketMainInfo image={data.image} infoData={rowInfos} />
          <Tab>
            <Tab.Review reviews={data.comments ?? []} artId={artId} />
            <Tab.Location>{data?.place}</Tab.Location>
            <Tab.Info>{data?.description}</Tab.Info>
            <Tab.CancelInfo>{data?.cautionDescription}</Tab.CancelInfo>
          </Tab>
        </DetailInfoWrapper>
        <ReservationCalendar schedules={data.schedules} disabled={isDisabled} />
      </DetailContent>
    </SpacerSkleton>
  );
}

const DetailContent = styled.div`
  display: flex;
`;

const TicketTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[900]};
`;

const DetailInfoWrapper = styled.div`
  margin-right: 1.5rem;
  width: 100%;
`;

const DetailHeader = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px ${({ theme }) => theme.colors.secondary[200]} solid;
  margin-bottom: 1.5rem;
`;
