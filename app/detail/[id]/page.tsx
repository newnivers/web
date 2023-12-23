"use client";

import { useMemo } from "react";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import {
  Genre,
  TicketMainInfo,
  ReservationCalendar,
  TabContainer,
} from "@/components/domains/detail";
import detailFixture from "@/fixture/detailPageFixture";

export default function DetailPage({ params }: { params: { id: number } }) {
  const { data } = detailFixture;
  // TODO: 제거 예정
  const rowInfos = useMemo(() => {
    return {
      place: data.place,
      startDate: data.startDate,
      endDate: data.endDate,
      ageLimit: data.ageLimit,
      runningTime: data.runningTime,
      interMission: data.interMission,
      price: Number(data.price),
    };
  }, [data]);

  if (!data) {
    return <div>로딩</div>;
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
          <TabContainer />
        </DetailInfoWrapper>
        <ReservationCalendar schedules={data.schedules} disabled={false} />
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
