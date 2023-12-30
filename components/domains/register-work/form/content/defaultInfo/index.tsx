import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import { WorkPeriodRegister } from "./workPeriodRegister";
import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  const { register, control } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      category: "TICKET",
      place: "",
      genre: "",
      age_limit: "",
      running_time: "",
      inter_mission: "",
    },
  });

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
                      <InputColumn id="category" name="카테고리">
                        <Field
                          iconType="selector"
                          style={{ width: "504px" }}
                          disabled={true}
                        >
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
                      <InputColumn id="title" name="작품이름">
                        <Field style={{ width: "504px" }}>
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
                      <InputColumn id="place" name="장소">
                        <Field iconType="selector" style={{ width: "504px" }}>
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
                      <InputColumn id="genre" name="장르">
                        <Field style={{ width: "504px" }}>
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
                      >
                        <Field style={{ width: "276px" }}>
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
                      <InputColumn id="running_time" name="러낭타임" unit="분">
                        <Field style={{ width: "276px" }}>
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
                      <InputColumn id="inter_mission" name="인터미션" unit="분">
                        <Field style={{ width: "276px" }}>
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
                return <div>showPeriod</div>;
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
