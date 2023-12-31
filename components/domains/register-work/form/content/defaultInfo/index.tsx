import dayjs from "dayjs";
import type { FieldValues } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import {
  CustomCalendar,
  CustomInput,
  ModalCustomContainer,
} from "@/components/common/calendar";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import { WorkPeriodRegister } from "./workPeriodRegister";
import type { FormContentProps } from "../type";

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

export function DefaultInfo({ classifications }: FormContentProps) {
  const { register, control, watch } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      category: "TICKET",
      place: "",
      genre: "",
      age_limit: "",
      running_time: "",
      inter_mission: "",
      ticket_open_date: Date.now(),
      ticket_open_time: "",
      ticket_close_date: Date.now(),
      ticket_close_time: "",
    },
  });

  const [ticketOpenDate, ticketCloseDate]: [Date, Date] = watch([
    "ticket_open_date",
    "ticket_close_date",
  ]);

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
                            selectOptions={[
                              { value: "TICKET", label: "Ticket" },
                            ]}
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
                            selectOptions={[
                              { value: "0", label: "남산" },
                              { value: "1", label: "예장" },
                              { value: "2", label: "빨간대문" },
                              { value: "3", label: "장소정보 참고" },
                            ]}
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
                      <Field iconType="selector" style={{ width: "217px" }}>
                        <Field.ControlledSelector
                          control={control}
                          name="ticket_open_time"
                          selectOptions={getTimeIntervals()}
                          placeholder="오픈 시간을 선택해주세요."
                        />
                      </Field>
                    </InputColumn>
                    <InputColumn
                      id="ticket_close"
                      name="티켓 마감"
                      labelPos="top"
                    >
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
                      <Field iconType="selector" style={{ width: "217px" }}>
                        <Field.ControlledSelector
                          control={control}
                          name="ticket_close_time"
                          selectOptions={getTimeIntervals()}
                          placeholder="마감 시간을 선택해주세요."
                        />
                      </Field>
                    </InputColumn>
                  </SpacerSkleton>
                );
              case "show-period":
                return <WorkPeriodRegister />;
              default:
                return null;
            }
          })()}
        </SpacerSkleton>
      ))}
    </>
  );
}
