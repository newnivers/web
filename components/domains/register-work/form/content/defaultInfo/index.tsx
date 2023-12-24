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
      mock: "",
      mock2: "",
      mock3: "test3",
      mock4: "",
      mock5: false,
    },
  });

  return (
    <>
      <WorkPeriodRegister />
      {classifications.map(({ key, name, desc }) => (
        <SpacerSkleton key={key} type="vertical" gap={16}>
          <TitleColumn name={name} desc={desc} />
          <InputColumn id="mock" name="인터미션" unit="분">
            <Field style={{ width: "300px" }}>
              <Field.ControlledText control={control} name="mock" />
            </Field>
          </InputColumn>
          <InputColumn id="mock2" name="장르">
            <Field style={{ width: "300px" }}>
              <Field.UncontrolledText
                register={register}
                placeholder="입력값을 넣어주세요"
                path="mock2"
                registerOptions={{
                  required: true,
                }}
              />
            </Field>
          </InputColumn>
          <InputColumn id="mock3" name="관람연령" labelPos="top">
            <Field style={{ width: "300px" }} iconType="selector">
              <Field.Selector
                control={control}
                name="mock3"
                selectOptions={[
                  { value: "test", label: "테스트" },
                  { value: "test2", label: "테스트2" },
                  { value: "test3", label: "테스트3" },
                ]}
              />
            </Field>
          </InputColumn>

          <Field style={{ width: "300px" }} iconType="calendar">
            <Field.Selector
              control={control}
              name="mock4"
              selectOptions={[
                { value: "test", label: "test" },
                { value: "test2", label: "test2" },
                { value: "test3", label: "test3" },
              ]}
            />
          </Field>
          <Field.Checkbox control={control} name="mock5" />
        </SpacerSkleton>
      ))}
    </>
  );
}
