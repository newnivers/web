import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";

export default function ReservedSeat({ seatCount }: { seatCount: number }) {
  return (
    <>
      <Header typo="subhead03">예약 가능 좌석</Header>
      <Typography typo="body02">비지정석 | {seatCount}</Typography>
    </>
  );
}

const Header = styled(Typography)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      padding-bottom: 0.5rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid ${colors.secondary[200]};
    `;
  }}
`;
