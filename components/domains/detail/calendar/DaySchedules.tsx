import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import format from "date-fns/format";
import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import { colors } from "@/styles/theme/colors";
import type { Schedule } from "./type";

type DaySchedulesProps = {
  scheduleMap: Record<string, Schedule[]>;
  onClickSchedule: Dispatch<SetStateAction<Schedule | null>>;
  selectedDate: Date | null;
  clickedSchedule: Schedule | null;
};

export default function DaySchedules({
  selectedDate,
  scheduleMap,
  onClickSchedule,
  clickedSchedule,
}: DaySchedulesProps) {
  const sessions = useMemo(() => {
    const date = dayjs(selectedDate).format("YYYY-MM-DD");

    return scheduleMap[date] ?? [];
  }, [scheduleMap, selectedDate]);

  return (
    <GridContainer>
      {sessions.map((session, index) => {
        return (
          <AvailableSchedule
            key={session.id}
            onClick={() => {
              onClickSchedule(session);
            }}
            isSelected={clickedSchedule?.id === session.id}
          >
            <Typography
              typo="body02"
              style={{
                color:
                  clickedSchedule?.id === session.id
                    ? colors.secondary.black
                    : colors.secondary[500],
              }}
            >
              {`${index + 1}회 | ${format(new Date(session.startAt), "HH:mm")}`}
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
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected
        ? theme.colors.secondary.black
        : theme.colors.secondary[400]}; ;
`;
