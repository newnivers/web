import Image from "next/image";
import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";

export type ReservationStepProps = {
  step: "PRICE_SELECT" | "SEAT_SELECT";
  purchaseLimitCount?: number;
  isAlert?: boolean;
};

export default function ReservationStep({
  step,
  purchaseLimitCount = 2,
  isAlert,
}: ReservationStepProps) {
  return (
    <Container>
      <Wrapper>
        <Step isActive={step === "SEAT_SELECT"}>좌석 선택</Step>
        <ArrowIcon
          src={`${
            step === "SEAT_SELECT"
              ? "/icon/right-arrow-active.svg"
              : "/icon/right-arrow-unactive.svg"
          }`}
          width={24}
          height={24}
          alt="right-arrow"
        />
        <Step isActive={step === "PRICE_SELECT"}>가격 선택</Step>
      </Wrapper>
      <AlertMessage isAlert={isAlert}>
        {`1인당 ${purchaseLimitCount}매까지 구매 가능합니다.`}
      </AlertMessage>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary[150]};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled(Image)`
  margin: 0 12px;
`;

const AlertMessage = styled(Typography)<{ isAlert?: boolean }>`
  ${({ theme }) => {
    const { colors, isAlert, typoToken } = theme;

    return css`
      color: ${isAlert ? colors.system.red : colors.secondary[500]};
      ${typoToken.subhead04}
    `;
  }}
`;

const Step = styled(Typography)<{ isActive: boolean }>`
  ${({ theme, isActive }) => {
    const { colors, typoToken } = theme;

    return css`
      ${typoToken.subhead02}
      color: ${isActive ? colors.secondary[400] : colors.secondary.black}
    `;
  }}
`;
