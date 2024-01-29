"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import type { ArtInfo } from "@/api";
import Typography from "@/components/common/text/Typography";
import { Ticket } from "@/components/domains/landing-page";
import { ProgressTicket } from "@/components/domains/ticket-page/ProgressTicket";
import mockImage from "@/fixture/ticket-poster.jpeg";

const mock = [
  {
    id: 3,
    user: 1,
    place: "빨간대문",
    title: "test",
    image: "http://www.naver.com",
    genre: "test",
    category: "SHOW",
    status: "APPROVED",
    runningTime: 40,
    ageLimit: 0,
    interMission: 10,
    description: "testtesttest",
    cautionDescription: "testetest",
    csPhoneNumber: "+821051972093",
    reservedSeat: false,
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-18T15:00:00Z",
    isFree: false,
    purchaseLimitCount: 5,
    price: "10000.00",
    schedules: [
      {
        id: 5,
        startAt: "2023-11-16T17:30:00+09:00",
        leftSeatCount: 0,
      },
      {
        id: 6,
        startAt: "2023-11-17T17:30:00+09:00",
        leftSeatCount: 0,
      },
    ],
    comments: [],
    ticketOpenAt: "2023-11-17T17:30:00+09:00",
    ticketCloseAt: "2023-11-30T17:30:00+09:00",
    createdAt: "2023-11-19T17:20:48.206593+09:00",
    updatedAt: "2024-01-28T13:50:57.773711+09:00",
    seatMaxCount: 0,
    hitCount: 27,
  },
  {
    id: 5,
    user: 2,
    place: "빨간대문",
    title: "test",
    image: "http://www.naver.com",
    genre: "test",
    category: "SHOW",
    status: "APPROVED",
    runningTime: 40,
    ageLimit: 0,
    interMission: 10,
    description: "testtesttest",
    cautionDescription: "testetest",
    csPhoneNumber: "+821051972093",
    reservedSeat: false,
    startDate: "2023-11-17T08:30:00Z",
    endDate: "2023-11-19T15:00:00Z",
    isFree: false,
    purchaseLimitCount: 5,
    price: "10000.00",
    schedules: [
      {
        id: 10,
        startAt: "2023-11-17T17:30:00+09:00",
        leftSeatCount: 2,
      },
      {
        id: 9,
        startAt: "2023-11-18T17:30:00+09:00",
        leftSeatCount: 0,
      },
    ],
    comments: [
      {
        author: 2,
        art: 5,
        description: "dfsdsfafadadf",
        score: 0,
      },
    ],
    ticketOpenAt: "2023-11-17T17:30:00+09:00",
    ticketCloseAt: "2023-11-19T17:30:00+09:00",
    createdAt: "2023-12-19T20:13:59.079114+09:00",
    updatedAt: "2024-01-22T22:50:55.309417+09:00",
    seatMaxCount: 0,
    hitCount: 4,
  },
  {
    id: 1,
    user: 2,
    place: "빨간대문",
    title: "test",
    image: "http://www.naver.com",
    genre: "test",
    category: "SHOW",
    status: "APPROVED",
    runningTime: 40,
    ageLimit: 0,
    interMission: 10,
    description: "testtesttest",
    cautionDescription: "testetest",
    csPhoneNumber: "+821051972093",
    reservedSeat: false,
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-18T15:00:00Z",
    isFree: false,
    purchaseLimitCount: 5,
    price: "10000.00",
    schedules: [
      {
        id: 1,
        startAt: "2023-11-16T17:30:00+09:00",
        leftSeatCount: 0,
      },
      {
        id: 2,
        startAt: "2023-11-17T17:30:00+09:00",
        leftSeatCount: 0,
      },
    ],
    comments: [],
    ticketOpenAt: "2023-11-17T17:30:00+09:00",
    ticketCloseAt: "2023-11-30T17:30:00+09:00",
    createdAt: "2023-11-18T18:01:33.129115+09:00",
    updatedAt: "2024-01-28T15:54:57.218043+09:00",
    seatMaxCount: 0,
    hitCount: 2,
  },
];

export function TicketHomePage({
  hotRanking,
  openTickets,
}: {
  hotRanking: ArtInfo[];
  openTickets: ArtInfo[];
}) {
  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Container>
      <Header typo="headline">Hot Ranking</Header>
      <HotRankingWrapper>
        {mock.map((rank, index) => (
          <Ticket
            onClick={() => moveToDetailPage(rank.id)}
            ranking={index + 1}
            key={rank.id}
            thumbnail={mockImage}
            genre={rank.genre}
            title={rank.title}
            startDate={rank.startDate}
            endDate={rank.endDate}
          />
        ))}
      </HotRankingWrapper>
      <Header typo="headline">Ticket Open</Header>
      <TicketOpenWrapper>
        {[...mock, ...mock, ...mock].map((rank, index) => (
          <ProgressTicket
            onClick={() => moveToDetailPage(rank.id)}
            key={index}
            thumbnail={mockImage}
            genre={rank.genre}
            title={rank.title}
            startDate={rank.startDate}
            endDate={rank.endDate}
          />
        ))}
      </TicketOpenWrapper>
    </Container>
  );
}

const Container = styled.div``;
const Header = styled(Typography)`
  display: block;
  margin-bottom: 16px;
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
