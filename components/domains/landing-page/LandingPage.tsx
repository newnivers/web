import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";
import { Ticket } from "@/components/domains/landing-page/Ticket";
import mockImage from "@/fixture/ticket-poster.jpeg";
import { useGetLandingArtList } from "@/queries";
import { ListHeader } from "./ListHeader";

// TODO: 진짜 이미지 테스트 필요!!
export function LandingPage() {
  const { data } = useGetLandingArtList();

  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Container>
      <ListHeader
        title="HOT RANKING"
        description="서울예술대학교의 인기있는 작품들을 모아놓은 섹션 중 하나입니다."
      />
      <HotRankingWrapper>
        {data?.hotRanking &&
          data.hotRanking.map((rank, index) => (
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

      <ListHeader
        title="TICKET"
        description="현재 티켓 예매가 가능한 작품입니다."
      />
      <TicketsWrapper>
        {data?.ticket &&
          data.ticket.map((rank) => (
            <Ticket
              onClick={() => moveToDetailPage(rank.id)}
              key={rank.id}
              thumbnail={mockImage}
              genre={rank.genre}
              title={rank.title}
              startDate={rank.startDate}
              endDate={rank.endDate}
            />
          ))}
      </TicketsWrapper>
      <SeeMoreButton onClick={() => router.push("/ticket")}>
        더보기
      </SeeMoreButton>
      <ListHeader
        title="ARCHIVING"
        description="서울예술대학교의 지난 작품을 확인해 보세요."
      />
      <Preparing>
        <Typography typo="subhead01">준비 중입니다.</Typography>{" "}
      </Preparing>
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

const Preparing = styled.div`
  width: 1168px;
  height: 370px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary[100]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
