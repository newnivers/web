/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement, ReactNode } from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import type { FieldValues } from "react-hook-form";
import styled, { css } from "styled-components";
import httpClient from "@/api/core";
import DefaultButton from "@/components/common/button";
import { DefaultModal } from "@/components/common/modal";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { StepNavigator } from "@/components/domains/register-work/stepNavigator";
import { useFileUpload } from "@/hooks";
import { WorkForm } from "./context";
import { combineDateTime } from "./helper";

interface Props {
  children: ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  const router = useRouter();
  const { isFirstStep, isLastStep, movePrev, moveNext } =
    StepNavigator.onlyHook();
  const {
    workForm: { handleSubmit },
    editorManager,
  } = WorkForm.onlyHook();
  const { fileUpload } = useFileUpload();

  const [modal, setModal] = useState<{
    isShow: boolean;
    successForm: boolean;
    content: ReactElement | null;
    handler: (() => void) | null;
  }>({
    isShow: false,
    successForm: false,
    content: null,
    handler: null,
  });

  const onMoveEnrollmentPage = useCallback(() => {
    router.replace("/enrollment-check");
  }, [router]);

  const onClickModalReset = useCallback(() => {
    setModal({
      isShow: false,
      successForm: false,
      content: null,
      handler: null,
    });
  }, []);

  const onSubmitWorkForm = async (data: FieldValues) => {
    const isCompleteFill = Object.entries(data).every(([key, value]) => {
      if (key === "is_free") {
        return true;
      }
      if (key === "reserved_seat") {
        return true;
      }
      if (key === "price") {
        return true;
      }

      return !!String(value);
    });

    if (!isCompleteFill) {
      setModal({
        isShow: true,
        successForm: false,
        content: (
          <Typography
            typo="body02"
            style={{
              color: "#505050",
            }}
          >
            작성하지 않은 항목이 있습니다.
          </Typography>
        ),
        handler: onClickModalReset,
      });

      return;
    }

    const body = {
      category: data.category,
      title: data.title,
      place: data.place,
      genre: data.genre,
      age_limit: data.age_limit,
      running_time: data.running_time,
      inter_mission: data.inter_mission,
      image: "",
      is_free: true,
      purchase_limit_count: data.purchase_limit_count,
      price: data.price,
      reserved_seat: false,
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

    const [imageInfo, descriptionHtml, cautionDescriptionHtml] =
      await Promise.all([
        fileUpload(data.image),
        editorManager.processCachedImagesFromHtml(data.description),
        editorManager.processCachedImagesFromHtml(data.caution_description),
      ]);

    body.image = imageInfo?.Location || "";
    body.description = descriptionHtml;
    body.caution_description = cautionDescriptionHtml;

    try {
      await httpClient.post("/arts", {
        data: body,
      });
      setModal({
        isShow: true,
        successForm: true,
        content: (
          <SpacerSkleton type="vertical" gap={20}>
            <SpacerSkleton type="vertical">
              <Typography
                typo="body02"
                style={{
                  color: "#505050",
                }}
              >
                작품은 관리자 검수 후 등록됩니다.
              </Typography>
              <Typography
                typo="body02"
                style={{
                  color: "#505050",
                }}
              >
                {`검수 진행 사항은 '등록 확인'에서 확인 바랍니다.`}
              </Typography>
            </SpacerSkleton>
            <Typography
              typo="body02"
              style={{
                color: "#505050",
              }}
            >
              {`(검수 소요 시간: 1 ~ 2일)`}
            </Typography>
          </SpacerSkleton>
        ),
        handler: onMoveEnrollmentPage,
      });
    } catch (error) {
      setModal({
        isShow: true,
        successForm: false,
        content: <p>작품 등록에 실패하였습니다.</p>,
        handler: onClickModalReset,
      });
    }
  };

  return (
    <>
      <DefaultModal
        isShow={modal.isShow}
        onClose={modal.successForm ? onMoveEnrollmentPage : onClickModalReset}
      >
        <SpacerSkleton
          type="vertical"
          gap={32}
          style={{
            padding: "24px 32px",
          }}
        >
          <SpacerSkleton type="vertical" align="center" gap={12}>
            <Typography typo="subhead01">작품 등록</Typography>
            <Image src="/icon/error.svg" width={20} height={20} alt="error" />
            {modal.content}
          </SpacerSkleton>
          <DefaultButton
            onClick={modal.handler || onClickModalReset}
            style={{
              width: "384px",
              height: "56px",
            }}
          >
            확인
          </DefaultButton>
        </SpacerSkleton>
      </DefaultModal>
      <Form onSubmit={handleSubmit(onSubmitWorkForm)}>
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
    </>
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
