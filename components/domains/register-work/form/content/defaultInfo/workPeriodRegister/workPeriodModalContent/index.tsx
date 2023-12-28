import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { CustomCalendar, CustomHeader } from "@/components/common/calendar";
import { SpacerSkleton } from "@/components/common/spacer";

interface Round {
  id: string;
  time: string | null;
}

interface WorkPeriod {
  date: Date;
  rounds: Round[];
}

export function WorkPeriodModalContent() {
  const [workPeriods, setWorkPeriods] = useState<WorkPeriod[]>([]);

  const dates = useMemo(
    () => workPeriods.map((workPeriod) => workPeriod.date),
    [workPeriods]
  );

  const onChangeDate = (date: Date | null) => {
    if (!date) {
      return;
    }

    const isAlreadyExistDate = workPeriods.find(
      (workPeriod) => workPeriod.date.toString() === date.toString()
    );

    if (isAlreadyExistDate) {
      return;
    }

    setWorkPeriods([
      ...workPeriods,
      { date, rounds: [{ id: `${date}-round-1`, time: null }] },
    ]);
  };

  const onClickRemoveDate = (e: MouseEvent<HTMLButtonElement>) => {
    const { date } = e.currentTarget.dataset;

    if (!date) {
      return;
    }

    const filteredWorkPeriods = workPeriods.filter(
      (workPeriod) => workPeriod.date.toString() !== date.toString()
    );

    setWorkPeriods(filteredWorkPeriods);
  };

  const onClickAddRound = (e: MouseEvent<HTMLButtonElement>) => {
    const { date } = e.currentTarget.dataset;

    if (!date) {
      return;
    }

    const updatedWorkPeroids = workPeriods.map((workPeroid) => {
      if (workPeroid.date.toString() === date) {
        const { rounds } = workPeroid;
        const addedRounds = [
          ...rounds,
          {
            id: `${date}-round-${rounds.length + 1}`,
            time: null,
          },
        ];

        return {
          ...workPeroid,
          rounds: addedRounds,
        };
      }

      return workPeroid;
    });

    setWorkPeriods(updatedWorkPeroids);
  };

  const onClickRemoveRound = (e: MouseEvent<HTMLButtonElement>) => {
    const { date, round } = e.currentTarget.dataset;

    if (!round) {
      return;
    }

    const updatedWorkPeroids = workPeriods.map((workPeroid) => {
      if (workPeroid.date.toString() === date) {
        const filteredRounds = workPeroid.rounds.filter(
          ({ id }) => id !== round
        );

        return {
          ...workPeroid,
          rounds: filteredRounds,
        };
      }

      return workPeroid;
    });

    setWorkPeriods(updatedWorkPeroids);
  };

  return (
    <Container style={{ width: "1000px", height: "652px" }}>
      <CalendarWrapper>
        <CustomCalendar
          renderCustomHeader={(headerProps) => (
            <CustomHeader
              headerProps={headerProps}
              style={{ padding: "0 15px" }}
            />
          )}
          selected={null}
          onChangeDate={onChangeDate}
          highlightDates={dates}
        />
      </CalendarWrapper>
      <Divider />
      <RoundRegister>round</RoundRegister>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      border-top: 1px solid ${colors.secondary[150]};
    `;
  }}
`;

const CalendarWrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      flex: 1;
      margin-top: 40px;

      .react-datepicker {
        .react-datepicker__day-names {
          .react-datepicker__day-name {
            width: 56.29px;
            height: 32px;
            margin: 0;
          }
        }

        .react-datepicker__week {
          .react-datepicker__day {
            width: 52.86px;
            height: 52.86px;
            margin: 0.105rem;
            padding: 14px;
            border-radius: 50%;
          }
        }

        .react-datepicker__day--highlighted {
          border: 1px solid ${colors.secondary[900]};
          background-color: ${colors.secondary.white};
          color: ${colors.secondary.black};

          &:hover {
            background-color: ${colors.secondary.white};
          }
        }

        .react-datepicker__day--highlighted.confirmed {
          background-color: ${colors.secondary[900]};
          color: ${colors.secondary.black};

          &:hover {
            background-color: ${colors.secondary[900]};
          }
        }
      }
    `;
  }}
`;

const Divider = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 1px;
      height: inherit;
      background-color: ${colors.secondary[150]};
    `;
  }}
`;

const RoundRegister = styled.div`
  flex: 1;
`;
