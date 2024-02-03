import { useEffect, useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import ReservationSummaryPanel from "@/components/domains/detail/reservation/ReservationSummaryPanel";
import TicketQuantitySelect from "@/components/domains/detail/reservation/TicketQuantitySelect";
import ReservationStep from "./ReservationStep";

interface Props {
  isShow: boolean;
  onClose: () => void;
  onReserve: (quantity: number) => void;
  price?: number;
}

export function ReservationModal({ isShow, onClose, onReserve, price }: Props) {
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <Backdrop>
      <Content onClick={(e) => e.stopPropagation()}>
        <TopSection justify="flex-end">
          <button onClick={onClose}>
            <Image
              src="/icon/default-close.svg"
              width={24}
              height={24}
              alt="default-close"
            />
          </button>
        </TopSection>
        <ContentSection>
          <Wrapper>
            <ReservationStep step={"PRICE_SELECT"} />
            <TicketQuantitySelect
              ticketCount={ticketCount}
              setTicketCount={setTicketCount}
            />
          </Wrapper>
          <ReservationSummaryPanel
            ticketPrice={0}
            discount={0}
            reservationFee={0}
            ticketCount={ticketCount}
            onClickReserveButton={() => onReserve(ticketCount)}
          />
        </ContentSection>
      </Content>
    </Backdrop>
  );
}

const Wrapper = styled.div`
  width: 45rem;
`;
const ContentSection = styled.div`
  display: flex;
`;

const TopSection = styled(SpacerSkleton)`
  padding: 8px 16px;
  border-bottom: 1px solid #e8e8e8;
`;

const Backdrop = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      z-index: 9999;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: ${colors.secondary["black-50"]};
    `;
  }}
`;

const Content = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      border-radius: 12px;
      background-color: ${colors.secondary.white};
      box-shadow: 0 5px 15px ${colors.secondary["black-30"]};
    `;
  }}
`;
