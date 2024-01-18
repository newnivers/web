/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactNode } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import type { FieldValues } from "react-hook-form";
import styled, { css } from "styled-components";
import httpClient from "@/api/core";
import { SpacerSkleton } from "@/components/common/spacer";
import { StepNavigator } from "@/components/domains/register-work/stepNavigator";
import { WorkForm } from "./context";
import { combineDateTime } from "./helper";

interface Props {
  children: ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  const { isFirstStep, isLastStep, movePrev, moveNext } =
    StepNavigator.onlyHook();
  const {
    workForm: { handleSubmit },
    editorManager,
  } = WorkForm.onlyHook();

  const onSubmitWorkForm = async (data: FieldValues) => {
    const body = {
      category: data.category,
      title: data.title,
      place: data.place,
      genre: data.genre,
      age_limit: data.age_limit,
      running_time: data.running_time,
      inter_mission: data.inter_mission,
      image:
        "https://daejeonmobile.com/web/product/big/202204/4b689cbd5304052df787d36b68c9deee.jpg",
      is_free: data.is_free,
      purchase_limit_count: data.purchase_limit_count,
      price: data.price,
      reserved_seat: data.reserved_seat,
      seat_max_count: data.seat_max_count,
      ticket_open_at: "",
      ticket_close_at: "",
      description: data.description,
      caution_description: data.caution_description,
      schedules: [],
    };

    const ticket_open_at = dayjs(
      combineDateTime(data.ticket_open_date, data.ticket_open_time)
    ).format();
    const ticket_close_at = dayjs(
      combineDateTime(data.ticket_close_date, data.ticket_close_time)
    ).format();

    body.ticket_open_at = ticket_open_at;
    body.ticket_close_at = ticket_close_at;

    // await editorManager.processCachedImagesFromHtml()

    const schedules: string[] = [];

    data.schedules.forEach((schedule: { rounds: any[]; date: Date }) => {
      schedule.rounds.forEach((round: { time: string }) => {
        const combinedDateTime = dayjs(
          combineDateTime(schedule.date, round.time)
        ).format();
        schedules.push(combinedDateTime);
      });
    });

    body.schedules = schedules as never[];

    const res = await httpClient.post("/arts", {
      data: body,
    });
    console.log(res);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitWorkForm, (data) => {
        console.log(data);
      })}
    >
      <Content type="vertical" gap={52}>
        {children}
      </Content>
      <StepController justify="flex-end" gap={10} align="center">
        {!isFirstStep && (
          <StepButton type="button" onClick={() => movePrev()}>
            <Image
              src="/icon/double-arrow-left.svg"
              width={16}
              height={16}
              alt="double-arrow-left"
            />
            <p>이전 페이지</p>
          </StepButton>
        )}

        {!isLastStep && (
          <StepButton type="button" onClick={() => moveNext()}>
            <p>다음 페이지</p>
            <Image
              src="/icon/double-arrow-right.svg"
              width={16}
              height={16}
              alt="dobule-arrow-right"
            />
          </StepButton>
        )}
        {isLastStep && <StepButton type="submit">작품등록</StepButton>}
      </StepController>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 78px;
  width: 100%;
`;

const Content = styled(SpacerSkleton)`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;

const StepController = styled(SpacerSkleton)``;

const StepButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 148px;
      height: 56px;
      border: 1px solid ${colors.secondary[400]};
      border-radius: 4px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
