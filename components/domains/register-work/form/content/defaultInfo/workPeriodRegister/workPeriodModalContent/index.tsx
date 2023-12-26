import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import { CustomCalendar, CustomHeader } from "@/components/common/calendar";

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
    <CustomCalendar
      renderCustomHeader={(headerProps) => (
        <CustomHeader headerProps={headerProps} />
      )}
      selected={null}
      onChangeDate={onChangeDate}
      highlightDates={dates}
    />
  );
}
