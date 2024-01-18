import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/common/button";
import { CustomCalendar } from "@/components/common/calendar";
import { ConfirmModal } from "@/components/common/modal";
import Typography from "@/components/common/text/Typography";
import CustomHeader from "@/components/domains/detail/calendar/CustomHeader";
import DaySchedules from "@/components/domains/detail/calendar/DaySchedules";
import ReservedSeat from "@/components/domains/detail/calendar/ResearvedSeat";
import type {
  ReservationCalendarProps,
  Schedule,
} from "@/components/domains/detail/calendar/type";
import { ReservationModal } from "@/components/domains/detail/reservation/ReservationModal";
import ReservationNotice from "@/components/domains/detail/reservation/ReservationNotice";

type ReserveModalCase = "NOTICE" | "COMPLETION" | "RESERVATION" | null;

const convertScheduleData = (schedules: Schedule[]) => {
  return schedules.map((schedule) => {
    return new Date(schedule.startAt);
  });
};

export default function ReservationCalendar({
  schedules = [],
}: ReservationCalendarProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [clickedScheduleId, setClickedScheduleId] = useState<number | null>(
    null
  );
  const [availableSeatCount, setAvailableSeatCount] = useState<null | number>(
    null
  );
  const [modalStatus, setModalStatus] =
    useState<ReserveModalCase>("RESERVATION");

  const onChangeDate = (date: Date | null) => {
    setDate(date);
  };

  const closeModal = () => {
    setModalStatus(null);
  };

  return (
    <Container>
      <Wrapper>
        <Header typo="subhead03">날짜/시간 선택</Header>
        <CustomCalendar
          includeDates={convertScheduleData(schedules)}
          renderCustomHeader={(headerProps) => (
            <CustomHeader headerProps={headerProps} />
          )}
          selected={date}
          onChangeDate={onChangeDate}
        />
        <DaySchedules
          selectedDate={date}
          schedules={schedules}
          onClickSchedule={setClickedScheduleId}
          clickedId={clickedScheduleId}
        />
        <ReservedSeat seatCount={100} />
      </Wrapper>
      <ReserveButton
        onClick={() => {
          setModalStatus("NOTICE");
        }}
      >
        예매하기
      </ReserveButton>
      <ConfirmModal
        isShow={modalStatus === "NOTICE"}
        title={"예매 공지 확인"}
        onClose={closeModal}
        onConfirm={() => {
          setModalStatus("RESERVATION");
        }}
      >
        <ReservationNotice />
      </ConfirmModal>
      <ConfirmModal
        isShow={modalStatus === "COMPLETION"}
        title={"결재 완료"}
        onClose={closeModal}
        onConfirm={closeModal}
      >
        티켓 구매가 완료되었습니다.
        <br /> 구매하신 티켓은 MY PAGE에서 확인 가능합니다.
      </ConfirmModal>
      <ReservationModal
        isShow={modalStatus === "RESERVATION"}
        onReserve={() => {
          setModalStatus("COMPLETION");
        }}
        onClose={closeModal}
      />
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
