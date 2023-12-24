import { useState } from "react";
import styled, { css } from "styled-components";
import Button from "@/components/common/button";
import { CustomCalendar } from "@/components/common/calendar";
import Typography from "@/components/common/text/Typography";
import CustomHeader from "@/components/domains/detail/calendar/CustomHeader";
import DaySchedules from "@/components/domains/detail/calendar/DaySchedules";
import ReservedSeat from "@/components/domains/detail/calendar/ResearvedSeat";
import type { ReservationCalendarProps } from "@/components/domains/detail/calendar/type";

export default function ReservationCalendar({
  schedules,
}: ReservationCalendarProps) {
  // TODO: Link Calendar Function

  const [date, setDate] = useState<Date | null>(null);
  const [clickedScheduleId, setClickedScheduleId] = useState<number | null>(
    null
  );
  const [availableSeatCount, setAvailableSeatCount] = useState<null | number>(
    null
  );

  const onChangeDate = (date: Date | null) => {
    setDate(date);
  };

  return (
    <Container>
      <Wrapper>
        <Header typo="subhead03">날짜/시간 선택</Header>
        <CustomCalendar
          renderCustomHeader={(headerProps) => (
            <CustomHeader headerProps={headerProps} />
          )}
          selected={date}
          onChangeDate={onChangeDate}
        />
        <DaySchedules
          schedules={schedules}
          onClickSchedule={setClickedScheduleId}
          clickedId={clickedScheduleId}
        />
        <ReservedSeat seatCount={100} />
      </Wrapper>
      <ReserveButton>예매하기</ReserveButton>
    </Container>
  );
}

const Container = styled.aside`
  height: fit-content;
  position: sticky;
  top: 50px;
  width: 19rem;
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary[200]};
  height: fit-content;
  position: sticky;
  margin-bottom: 1rem;
`;

const Header = styled(Typography)`
  display: block;
  border-bottom: 0.0625rem solid #d4d4d4;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
`;

const ReserveButton = styled(Button)`
  width: 100%;
`;
