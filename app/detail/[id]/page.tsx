"use client";

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

export default function DetailPage({ params }: { params: { id: number } }) {
  const { data, rowInfos } = useTicketDetail(params.id);

  if (!data || !rowInfos) {
    return <div>Error Page</div>;
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
              <Tab.Review reviews={data.comments ?? []} />
              <Tab.Location />
              <Tab.Info />
              <Tab.CancelInfo />
            </Tab>
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
