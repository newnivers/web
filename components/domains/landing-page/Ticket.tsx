import { useMemo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

interface TicketProps {
  thumbnail: string;
  genre: string;
  title: string;
  startDate: string;
  endDate: string;
  ranking?: number;
  onClick: () => void;
  ticketOpenDate?: Date;
}

export function Ticket({
  thumbnail,
  genre,
  title,
  startDate,
  endDate,
  ranking,
  onClick,
}: TicketProps) {
  const period = useMemo(() => {
    const start = `${dayjs(startDate).format("YYYY-DD-MM")} (${dayjs(
      startDate
    ).format("ddd")})`;

    const end = `${dayjs(endDate).format("YYYY-DD-MM")} (${dayjs(
      endDate
    ).format("ddd")})`;

    return `${start} ~ ${end}`;
  }, [startDate, endDate]);

  return (
    <Wrapper onClick={onClick}>
      <>
        <img src={thumbnail} alt="티켓 이미지" width={368} height={480} />
      </>
      {ranking ? <Ranking typo="subhead01">{ranking}</Ranking> : <></>}
      <Genre typo="subhead03">{`#${genre}`}</Genre>
      <Title typo="subhead03">{title}</Title>
      <Period typo="body02">{period}</Period>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const Ranking = styled(Typography)`
  background-color: ${({ theme }) => theme.colors.primary.point};
  color: white;
  width: 42px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  position: absolute;
  top: 459px;
  left: 10px;
  border-radius: 2px;
`;

const Genre = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
  margin-bottom: 4px;
  margin-top: 24px;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
  margin-bottom: 12px;
`;

const Period = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
`;
