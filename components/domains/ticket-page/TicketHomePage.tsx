"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import { Ticket } from "@/components/domains/landing-page";
import { ProgressTicket } from "@/components/domains/ticket-page/ProgressTicket";
import mockImage from "@/fixture/ticket-poster.jpeg";
import { useGetTicketHomeList } from "@/queries";

export function TicketHomePage() {
  const { data } = useGetTicketHomeList();
  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Container>
      <Header typo="headline">Hot Ranking</Header>
      <HotRankingWrapper>
        {data &&
          data.hotRanking.map((rank, index) => (
            <Ticket
              onClick={() => moveToDetailPage(rank.id)}
              ranking={index + 1}
              key={rank.id}
              thumbnail={rank.image}
              genre={rank.genre}
              title={rank.title}
              startDate={rank.startDate}
              endDate={rank.endDate}
            />
          ))}
      </HotRankingWrapper>
      <Header typo="headline">Ticket Open</Header>
      <TicketOpenWrapper>
        {data &&
          data.ticketOpen.map((rank, index) => (
            <ProgressTicket
              onClick={() => moveToDetailPage(rank.id)}
              key={index}
              thumbnail={rank.image}
              genre={rank.genre}
              title={rank.title}
              startDate={rank.startDate}
              endDate={rank.endDate}
              ticketOpenAt={rank.ticketOpenAt}
            />
          ))}
      </TicketOpenWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled(Typography)`
  display: block;
  margin-bottom: 16px;
  align-self: start;
`;
const HotRankingWrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 1168px;
  justify-content: center;
  margin-bottom: 60px;
`;
const TicketOpenWrapper = styled.div`
  display: grid;
  gap: 32px;
  width: 1168px;
  grid-template-columns: 268px 268px 268px 268px;
`;
