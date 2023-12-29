import type { MouseEvent } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled, { css } from "styled-components";
import { Field } from "@/components/common/field";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { WorkPeriod } from "../shared";

dayjs.locale("ko");

interface Props {
  workPeriod: WorkPeriod;
  onClickRemoveDate: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickAddRound: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickRemoveRound: (e: MouseEvent<HTMLButtonElement>) => void;
}

const getTimeIntervals = () => {
  let currentTime = dayjs().startOf("day");
  const endOfDay = dayjs().endOf("day");

  const timeIntervals = [];

  while (currentTime.isBefore(endOfDay)) {
    timeIntervals.push({
      value: currentTime.format("HH:mm"),
      label: currentTime.format("HH:mm"),
    });
    currentTime = currentTime.add(30, "minute");
  }

  return timeIntervals;
};

export function RoundInfo({
  workPeriod,
  onClickRemoveDate,
  onClickAddRound,
  onClickRemoveRound,
}: Props) {
  const date = dayjs(workPeriod.date);

  const dateName = date.format("YYYY년 MM월 DD일 (ddd요일)");

  return (
    <Container type="vertical" gap={8} as="li">
      <SpacerSkleton
        justify="space-between"
        align="center"
        style={{ padding: "0 8px" }}
      >
        <DateTypography typo="body02">{dateName}</DateTypography>
        <button data-date={workPeriod.date} onClick={onClickRemoveDate}>
          <Image
            src="/icon/default-close.svg"
            width={24}
            height={24}
            alt="default-close"
          />
        </button>
      </SpacerSkleton>
      <RoundList>
        {workPeriod.rounds.map((round, idx) => (
          <Spacer
            key={round.id}
            align="center"
            gap={12}
            as="li"
            style={{ padding: "8px 0" }}
          >
            <Typography typo="subhead03">{`${idx + 1}회차`}</Typography>
            <Field style={{ width: "300px" }}>
              <Field.DefaultSelector
                selectOptions={getTimeIntervals()}
                onSelect={(value) => {
                  console.log(value);
                }}
              />
            </Field>
            <SpacerSkleton align="center" gap={12}>
              <button data-date={workPeriod.date} onClick={onClickAddRound}>
                <Image
                  src="/icon/work-period-add.svg"
                  width={24}
                  height={24}
                  alt="work-period-add"
                />
              </button>
              {idx !== 0 && (
                <button
                  data-date={workPeriod.date}
                  data-round={round.id}
                  onClick={onClickRemoveRound}
                >
                  <Image
                    src="/icon/work-period-delete.svg"
                    width={24}
                    height={24}
                    alt="work-period-delete"
                  />
                </button>
              )}
            </SpacerSkleton>
          </Spacer>
        ))}
      </RoundList>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      &:first-child {
        padding-bottom: 20px;
      }

      &:not(:first-child) {
        padding: 20px 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.secondary[200]};
      }
    `;
  }}
`;

const DateTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary.black};
`;

const RoundList = styled.ul`
  padding: 0 8px;
`;
