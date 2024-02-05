import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import DefaultButton from "@/components/common/button";
import { CustomCalendar, CustomHeader } from "@/components/common/calendar";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { RoundInfo } from "../roundInfo";
import type { WorkPeriod } from "../shared";

interface Props {
  onConfirmWorkPeriods: (workPeriods: WorkPeriod[]) => void;
  onClickModalShow: () => void;
}

export function WorkPeriodModalContent({
  onConfirmWorkPeriods,
  onClickModalShow,
}: Props) {
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

  const onSelectRound = (date: Date, roundId: string, value: string) => {
    const updatedWorkPeriods = workPeriods.map((workPeriod) => {
      if (workPeriod.date.toString() === date.toString()) {
        const updatedRounds = workPeriod.rounds.map((round) => {
          if (round.id === roundId) {
            return { ...round, time: value };
          }

          return round;
        });

        return {
          ...workPeriod,
          rounds: updatedRounds,
        };
      }

      return workPeriod;
    });

    setWorkPeriods(updatedWorkPeriods);
  };

  const onConfirm = () => {
    onConfirmWorkPeriods(workPeriods);
    onClickModalShow();
  };

  const checkInvalidScheduleInfo = () => {
    if (workPeriods.length === 0) {
      return true;
    }

    let invalidField = false;
    workPeriods.forEach((workPeriod) => {
      workPeriod.rounds.forEach((round) => {
        if (!round.time) {
          invalidField = true;
        }
      });
    });

    return invalidField;

    const defaultRoundTime = workPeriods[0].rounds[0].time;

    if (!defaultRoundTime) {
      return true;
    }

    return false;
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
      <VerticalDivider />
      <SpacerSkleton type="vertical" style={{ flex: "1" }}>
        <SpacerSkleton style={{ flex: "2" }}>
          {dates.length === 0 ? (
            <SpacerSkleton
              justify="center"
              align="center"
              style={{ height: "inherit", flex: "1" }}
            >
              <EmptyRoundTypography typo="subhead01">
                왼쪽 달력의 날짜를 클릭해서 <br />
                일정을 등록해주세요!
              </EmptyRoundTypography>
            </SpacerSkleton>
          ) : (
            <WorkPeriods>
              {workPeriods.map((workPeriod) => (
                <RoundInfo
                  key={workPeriod.date.toString()}
                  workPeriod={workPeriod}
                  onClickRemoveDate={onClickRemoveDate}
                  onClickAddRound={onClickAddRound}
                  onClickRemoveRound={onClickRemoveRound}
                  onSelectRound={onSelectRound}
                />
              ))}
            </WorkPeriods>
          )}
        </SpacerSkleton>
        <HorizationalDivider />
        <SpacerSkleton
          justify="flex-end"
          align="center"
          style={{ flex: "0.17", padding: "16px 32px" }}
        >
          <DefaultButton
            type="button"
            onClick={onConfirm}
            disabled={checkInvalidScheduleInfo()}
          >
            <RegisterButtonTypography typo="subhead03">
              등록하기
            </RegisterButtonTypography>
          </DefaultButton>
        </SpacerSkleton>
      </SpacerSkleton>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      position: relative;
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
        .react-datepicker__header {
          padding-top: 0;
        }

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

const VerticalDivider = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 1px;
      background-color: ${colors.secondary[150]};
    `;
  }}
`;

const HorizationalDivider = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 100%;
      height: 1px;
      background-color: ${colors.secondary[150]};
    `;
  }}
`;

const WorkPeriods = styled.ul`
  flex: 1;
  height: 500px;
  margin-top: 40px;
  padding: 0 32px;
  overflow-y: scroll;
`;

const EmptyRoundTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
`;

const RegisterButtonTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary.white};
`;
