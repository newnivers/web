import styled from "styled-components";
import Button from "@/components/common/button";
import Typography from "@/components/common/text/Typography";

type ReservationSummaryPanelProps = {
  ticketPrice: number;
  discount: number;
  reservationFee: number;
  ticketCount: number;
  onClickReserveButton: () => void;
};

export default function ReservationSummaryPanel({
  ticketPrice = 0,
  discount = 0,
  reservationFee = 0,
  ticketCount = 0,
  onClickReserveButton,
}: ReservationSummaryPanelProps) {
  return (
    <Container>
      <LogoIcon />
      <Typography
        style={{
          marginBottom: "4px",
          display: "inline-block",
        }}
        typo="subhead03"
      >
        결제 금액
      </Typography>
      <Wrapper>
        <DataWrapper>
          <Typography typo="body02">기본가</Typography>
          <Typography typo="body02">{ticketPrice * ticketCount}원</Typography>
        </DataWrapper>
        <DataWrapper>
          <Typography typo="body03">가격 할인</Typography>
          <Typography typo="body03">{discount}원</Typography>
        </DataWrapper>
        <DataWrapper
          style={{
            marginBottom: "16px",
          }}
        >
          <Typography typo="body03">예매수수료</Typography>
          <Typography typo="body03">{reservationFee}원</Typography>
        </DataWrapper>
        <TotalCount>
          <Typography typo="subhead03">총금액</Typography>
          <Typography typo="subhead03">
            {ticketPrice * ticketCount - discount - reservationFee}원
          </Typography>
        </TotalCount>
      </Wrapper>
      <ReservationButton onClick={onClickReserveButton}>결제</ReservationButton>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  height: 560px;
  border-left: 1px solid ${({ theme }) => theme.colors.secondary[150]};
  padding: 8px 16px 20px 16px;
  display: flex;
  flex-direction: column;
`;

const LogoIcon = styled.div`
  height: 50px;
  width: 90px;
  object-fit: contain;
  margin: 8px auto 16px auto;
  background-repeat: no-repeat;
  background-image: url("/icon/plavnewniverse_black_logo.svg");
`;

const DataWrapper = styled.div`
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary[100]};
  border-radius: 4px;
  padding: 16px 0;
`;

const TotalCount = styled.div`
  padding: 16px 12px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary[150]};
`;

const ReservationButton = styled(Button)`
  margin-top: auto;
  width: 100%;
`;
