import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import styled, { css } from "styled-components";
import CalendarText from "@/components/common/calendar/CustomInput";
import { Field } from "@/components/common/field";
import { DefaultModal } from "@/components/common/modal";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { WorkPeriod } from "./shared";
import { WorkForm } from "../../../context";

interface Props {
  children: (onClickModalShow: () => void) => ReactNode;
}

export function WorkPeriodRegister({ children }: Props) {
  const {
    workForm: { watch },
  } = WorkForm.onlyHook();

  const [isShow, setShow] = useState(false);

  const schedules = watch("schedules") as WorkPeriod[];

  const onClickModalShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      <DefaultModal isShow={isShow} onClose={onClickModalShow}>
        {children(onClickModalShow)}
      </DefaultModal>
      {schedules.length > 0 ? (
        <SpacerSkleton type="vertical" gap={20}>
          {schedules.map((schedule) => {
            return (
              <SpacerSkleton key={`${schedule.date}`} gap={80}>
                <div
                  style={{
                    width: "81px",
                  }}
                >
                  <CalendarText
                    defaultValue={dayjs(schedule.date).format("YYYY.MM.DD")}
                    disabled={true}
                    style={{
                      width: "81px",
                    }}
                  />
                </div>
                <SpacerSkleton>
                  <SpacerSkleton gap={20}>
                    {schedule.rounds.map((round, idx) => {
                      return (
                        <SpacerSkleton key={round.id} align="center" gap={10}>
                          <Typography typo="subhead03">{`${
                            idx + 1
                          }회차`}</Typography>
                          <Field
                            disabled={true}
                            hasMinWidth={false}
                            style={{
                              width: "70px",
                            }}
                          >
                            <Field.DefaultText
                              className="reset"
                              defaultValue={`${round.time}`}
                              disabled={true}
                            />
                          </Field>
                        </SpacerSkleton>
                      );
                    })}
                  </SpacerSkleton>
                </SpacerSkleton>
              </SpacerSkleton>
            );
          })}
        </SpacerSkleton>
      ) : (
        <RegisterButton type="button" onClick={onClickModalShow}>
          <SpacerSkleton align="center" gap={6}>
            <Image
              src="/icon/register-plus.svg"
              width={24}
              height={24}
              alt="register-plus"
            />

            <RegisterText>클릭하여 작품 기간을 등록해주세요</RegisterText>
          </SpacerSkleton>
        </RegisterButton>
      )}
    </>
  );
}

const RegisterButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 52px 0;
      border-radius: 12px;
      background-color: ${colors.secondary[100]};

      &:disabled {
        cursor: not-allowed;
      }
    `;
  }}
`;

const RegisterText = styled.p`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-size: 24px;
      font-weight: 600;
      line-height: 36px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
