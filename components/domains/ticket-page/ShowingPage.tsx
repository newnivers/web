"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import { ProgressTicket } from "@/components/domains/ticket-page/ProgressTicket";
import { useGetTicketShowingList } from "@/queries";

export function ShowingPage() {
  const { data } = useGetTicketShowingList();
  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Container>
      <Header typo="headline">Showing</Header>
      <ShowingWrapper>
        {data &&
          data.showing.map((rank, index) => (
            <ProgressTicket
              onClick={() => moveToDetailPage(rank.id)}
              key={index}
              thumbnail={rank.image}
              genre={rank.genre}
              title={rank.title}
              startDate={rank.startDate}
              endDate={rank.endDate}
            />
          ))}
      </ShowingWrapper>
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
const ShowingWrapper = styled.div`
  display: grid;
  gap: 32px;
  width: 1168px;
  grid-template-columns: 268px 268px 268px 268px;
`;
