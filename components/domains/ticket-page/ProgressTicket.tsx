import { useMemo } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import { ProgressCircle } from "@/components/domains/ticket-page/ProgressCircle";

interface TicketProps {
  thumbnail: string | StaticImageData;
  genre: string;
  title: string;
  startDate: string;
  endDate: string;
  onClick: () => void;
  ticketOpenDate?: Date;
  showOpenProgress?: boolean;
}

export function ProgressTicket({
  thumbnail,
  genre,
  title,
  startDate,
  endDate,
  onClick,
  showOpenProgress,
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
        <Image src={thumbnail} alt="티켓 이미지" width={268} height={370} />
      </>
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
