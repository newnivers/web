import type { Dispatch, SetStateAction } from "react";
import format from "date-fns/format";
import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import type { Schedule } from "./type";

type DaySchedulesProps = {
  schedules: Schedule[];
  onClickSchedule: Dispatch<SetStateAction<number | null>>;
  selectedDate: Date | null;
  clickedId: number | null;
};

export default function DaySchedules({
  schedules,
  selectedDate,
  onClickSchedule,
  clickedId,
}: DaySchedulesProps) {
  return (
    <GridContainer>
      {schedules
        .filter((schedule) => {
          return (
            dayjs(schedule.startAt).startOf("day").valueOf() ===
            selectedDate?.valueOf()
          );
        })
        .map((schedule, index) => {
          return (
            <AvailableSchedule key={schedule.id}>
              <Typography typo="body02">
                {`${index + 1}회 | ${format(
                  new Date(schedule.startAt),
                  "HH:mm"
                )}`}
              </Typography>
            </AvailableSchedule>
          );
        })}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
`;

const AvailableSchedule = styled.button<{ isSelected?: boolean }>`
  color: ${(props) => (props.isSelected ? "red" : "#0A0A0A")};
  border-radius: 1.5rem;
  border: 1px solid #0a0a0a;
`;
