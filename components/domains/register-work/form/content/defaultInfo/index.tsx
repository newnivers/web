import { useCallback } from "react";
import { Controller } from "react-hook-form";
import {
  CustomCalendar,
  CustomInput,
  ModalCustomContainer,
} from "@/components/common/calendar";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import { workPlaces } from "@/components/domains/register-work/shared";
import { WorkPeriodRegister } from "./workPeriodRegister";
import type { WorkPeriod } from "./workPeriodRegister/shared";
import { WorkPeriodModalContent } from "./workPeriodRegister/workPeriodModalContent";
import { WorkForm } from "../../context";
import { getTimeIntervals } from "../../helper";
import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  const {
    workForm: { register, control, watch, setValue },
  } = WorkForm.onlyHook();

  const [ticketOpenDate, ticketCloseDate]: [Date, Date] = watch([
    "ticket_open_date",
    "ticket_close_date",
  ]);

  const onCofirmWorkPeriods = useCallback(
    (workPeriods: WorkPeriod[]) => {
      setValue("schedules", workPeriods);
    },
    [setValue]
  );

  return (
    <>
      {classifications.map(({ key, name, desc }) => (
        <SpacerSkleton key={key} type="vertical" gap={16}>
          <TitleColumn name={name} desc={desc} />
          {(() => {
            switch (key) {
              case "work-info":
                return (
                  <>
                    <SpacerSkleton gap={32}>
                      <InputColumn
                        id="category"
                        name="카테고리"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field iconType="selector" disabled={true}>
                          <Field.ControlledSelector
                            control={control}
                            name="category"
                            selectOptions={[{ value: "SHOW", label: "Ticket" }]}
                            disabled={true}
                          />
                        </Field>
                      </InputColumn>
                      <InputColumn
                        id="title"
                        name="작품이름"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field>
                          <Field.UncontrolledText
                            register={register}
                            placeholder="작품 이름을 입력해주세요."
                            path="title"
                            registerOptions={{
                              required: true,
                            }}
                          />
                        </Field>
                      </InputColumn>
                    </SpacerSkleton>
                    <SpacerSkleton gap={32}>
                      <InputColumn
                        id="place"
                        name="장소"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field iconType="selector">
                          <Field.ControlledSelector
                            control={control}
                            name="place"
                            selectOptions={workPlaces}
                            placeholder="장소를 골라주세요."
                          />
                        </Field>
                      </InputColumn>
                      <InputColumn
                        id="genre"
                        name="장르"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field>
                          <Field.UncontrolledText
                            register={register}
                            placeholder="장르를 입력해주세요."
                            path="genre"
                            registerOptions={{
                              required: true,
                            }}
                          />
                        </Field>
                      </InputColumn>
                    </SpacerSkleton>
                    <SpacerSkleton gap={24}>
                      <InputColumn
                        id="age_limit"
                        name="관람연령"
                        unit="세 이상"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field>
                          <Field.UncontrolledText
                            register={register}
                            placeholder="나이를 입력해주세요."
                            type="number"
                            path="age_limit"
                            registerOptions={{
                              required: true,
                            }}
                          />
                        </Field>
                      </InputColumn>
                      <InputColumn
                        id="running_time"
                        name="러낭타임"
                        unit="분"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field>
                          <Field.UncontrolledText
                            register={register}
                            placeholder="총 시간을 입력해주세요."
                            type="number"
                            path="running_time"
                            registerOptions={{
                              required: true,
                            }}
                          />
                        </Field>
                      </InputColumn>
                      <InputColumn
                        id="inter_mission"
                        name="인터미션"
                        unit="분"
                        spacer={{ style: { width: "100%" } }}
                      >
                        <Field>
                          <Field.UncontrolledText
                            register={register}
                            placeholder="쉬는 시간을 입력해주세요."
                            type="number"
                            path="inter_mission"
                            registerOptions={{
                              required: true,
                            }}
                          />
                        </Field>
                      </InputColumn>
                    </SpacerSkleton>
                  </>
                );
              case "ticket-schedule":
                return (
                  <SpacerSkleton gap={32}>
                    <InputColumn
                      id="ticket_open"
                      name="티켓 오픈"
                      labelPos="top"
                    >
                      <SpacerSkleton>
                        <Controller
                          control={control}
                          name="ticket_open_date"
                          render={({ field }) => (
                            <CustomCalendar
                              inline={false}
                              selected={ticketOpenDate}
                              onChangeDate={(date) => {
                                field.onChange(date);
                              }}
                              customInput={
                                <CustomInput style={{ width: "81px" }} />
                              }
                              calendarContainer={ModalCustomContainer}
                              dateFormat="yyyy.MM.dd"
                            />
                          )}
                        />
                        <Field
                          iconType="selector"
                          style={{ width: "217px", marginLeft: "8px" }}
                        >
                          <Field.ControlledSelector
                            control={control}
                            name="ticket_open_time"
                            selectOptions={getTimeIntervals()}
                            placeholder="오픈 시간을 선택해주세요."
                          />
                        </Field>
                      </SpacerSkleton>
                    </InputColumn>
                    <InputColumn
                      id="ticket_close"
                      name="티켓 마감"
                      labelPos="top"
                    >
                      <SpacerSkleton>
                        <Controller
                          control={control}
                          name="ticket_close_date"
                          render={({ field }) => (
                            <CustomCalendar
                              inline={false}
                              selected={ticketCloseDate}
                              onChangeDate={(date) => {
                                field.onChange(date);
                              }}
                              customInput={
                                <CustomInput style={{ width: "81px" }} />
                              }
                              calendarContainer={ModalCustomContainer}
                              dateFormat="yyyy.MM.dd"
                            />
                          )}
                        />
                        <Field
                          iconType="selector"
                          style={{ width: "217px", marginLeft: "8px" }}
                        >
                          <Field.ControlledSelector
                            control={control}
                            name="ticket_close_time"
                            selectOptions={getTimeIntervals()}
                            placeholder="마감 시간을 선택해주세요."
                          />
                        </Field>
                      </SpacerSkleton>
                    </InputColumn>
                  </SpacerSkleton>
                );
              case "show-period":
                return (
                  <WorkPeriodRegister>
                    {(onClickModalShow) => (
                      <WorkPeriodModalContent
                        onConfirmWorkPeriods={onCofirmWorkPeriods}
                        onClickModalShow={onClickModalShow}
                      />
                    )}
                  </WorkPeriodRegister>
                );
              default:
                return null;
            }
          })()}
        </SpacerSkleton>
      ))}
    </>
  );
}
