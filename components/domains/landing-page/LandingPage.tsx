import styled, { css } from "styled-components";
import { Ticket } from "@/components/domains/landing-page/Ticket";
import mockImage from "@/fixture/ticket-poster.jpeg";
import { ListHeader } from "./ListHeader";

const tickets: any[] = [
  {
    id: 1,
    image: mockImage,
    genre: "장르",
    title: "제목",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
  {
    id: 2,
    image: mockImage,
    genre: "장르2",
    title: "제목3",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
  {
    id: 3,
    image: mockImage,
    genre: "장르3",
    title: "제목34",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
  {
    id: 4,
    image: mockImage,
    genre: "장르3",
    title: "제목34",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
];

const hotRankings: any[] = [
  {
    id: 1,
    image: mockImage,
    genre: "장르",
    title: "제목",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
  {
    id: 2,
    image: mockImage,
    genre: "장르2",
    title: "제목3",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
  {
    id: 3,
    image: mockImage,
    genre: "장르3",
    title: "제목34",
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-29T08:30:00Z",
  },
];

export function LandingPage() {
  return (
    <Container>
      <ListHeader
        title="HOT RANKING"
        description="서울예술대학교의 인기있는 작품들을 모아놓은 섹션 중 하나입니다."
      />
      <HotRankingWrapper>
        {hotRankings.map((rank, index) => (
          <Ticket
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

      <ListHeader
        title="TICKET"
        description="현재 티켓 예매가 가능한 작품입니다."
      />
      <TicketsWrapper>
        {tickets.map((rank) => (
          <Ticket
            key={rank.id}
            thumbnail={rank.image}
            genre={rank.genre}
            title={rank.title}
            startDate={rank.startDate}
            endDate={rank.endDate}
          />
        ))}
      </TicketsWrapper>
      <SeeMoreButton>더보기</SeeMoreButton>
      <ListHeader
        title="ARCHIVING"
        description="서울예술대학교의 지난 작품을 확인해 보세요."
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 13.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HotRankingWrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 1168px;
  justify-content: center;
  margin-bottom: 156px;
`;

const TicketsWrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 1168px;
  justify-content: center;
`;

const SeeMoreButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      border: 1px solid ${colors.secondary[400]};
      width: 148px;
      height: 56px;
      color: ${colors.secondary[400]};
      margin: 50px auto 160px auto;
    `;
  }}
`;
