import { useMemo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import { ProgressCircle } from "@/components/domains/ticket-page/ProgressCircle";

interface TicketProps {
  thumbnail: string;
  genre: string;
  title: string;
  startDate: string;
  endDate: string;
  onClick: () => void;
  ticketOpenDate?: Date;
  showOpenProgress?: boolean;
  ticketOpenAt?: string;
}

export function ProgressTicket({
  thumbnail,
  genre,
  title,
  startDate,
  endDate,
  onClick,
  ticketOpenAt,
}: TicketProps) {
  const period = useMemo(() => {
    const start = `${dayjs(startDate).format("YYYY-MM-DD")} (${dayjs(
      startDate
    ).format("ddd")})`;

    const end = `${dayjs(endDate).format("YYYY-MM-DD")} (${dayjs(
      endDate
    ).format("ddd")})`;

    return `${start} ~ ${end}`;
  }, [startDate, endDate]);

  const leftDay = useMemo(() => {
    const ticketOpenDay = dayjs(ticketOpenAt);

    return ticketOpenDay.diff(dayjs(), "day");
  }, []);

  return (
    <Wrapper onClick={onClick}>
      <ImageWrapper>
        <img src={thumbnail} alt="티켓 이미지" width={268} height={370} />
        {ticketOpenAt && (
          <ProgressCircleWrapper>
            <ProgressCircle leftDay={leftDay} />
          </ProgressCircleWrapper>
        )}
      </ImageWrapper>
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
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 370px;
`;

const ProgressCircleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Genre = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
  margin-bottom: 4px;
  margin-top: 16px;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
  margin-bottom: 12px;
`;

const Period = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
