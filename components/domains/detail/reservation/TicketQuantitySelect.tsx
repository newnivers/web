import { useMemo } from "react";
import styled from "styled-components";
import { Field } from "@/components/common/field";
import Typography from "@/components/common/text/Typography";

type TicketQuantitySelectProps = {
  purchaseLimitCount?: number;
  ticketPrice?: number;
  ticketCount: number;
  setTicketCount: (count: number) => void;
};

export default function TicketQuantitySelect({
  purchaseLimitCount = 2,
  ticketPrice = 0,
  ticketCount = 0,
  setTicketCount,
}: TicketQuantitySelectProps) {
  const selectOptions = useMemo(() => {
    return Array.from({ length: purchaseLimitCount }, (_, index) => ({
      label: `${index + 1}매`,
      value: index + 1,
    }));
  }, [purchaseLimitCount]);

  return (
    <Container>
      <Wrapper>
        <Typography typo="subhead03">티켓 선택</Typography>
        <SelectedTicketCount>
          <Typography typo="subhead03">{ticketCount}</Typography>
          <Typography typo="body02">매 선택</Typography>
        </SelectedTicketCount>
      </Wrapper>
      <Wrapper>
        <Typography typo="body02">기본가</Typography>
        <SelectedTicketCount>
          <Typography
            style={{
              marginRight: "3.25rem",
            }}
            typo="body02"
          >{`${ticketPrice}원`}</Typography>
          <Field iconType="selector" style={{ minWidth: "86px" }}>
            <Field.DefaultSelector
              selectOptions={selectOptions}
              onSelect={(count) => {
                setTicketCount(Number(count));
              }}
              placeholder={`${ticketCount}`}
            />
          </Field>
        </SelectedTicketCount>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary[150]};
  display: flex;
  justify-content: space-between;
`;

const SelectedTicketCount = styled.div`
  display: flex;
  align-items: center;
`;
