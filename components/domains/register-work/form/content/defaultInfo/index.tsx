import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TitleColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  const { register, control } = useForm<FieldValues>({
    defaultValues: {
      mock: "",
      mock2: "",
      mock3: "test3",
      mock4: "",
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={16}>
      <TitleColumn name={name} desc={desc} />
      <Field style={{ width: "200px" }}>
        <Field.ControlledInput control={control} name="mock" />
      </Field>
      <Field style={{ width: "300px" }}>
        <Field.UncontrolledInput
          register={register}
          placeholder="입력값을 넣어주세요"
          path="mock2"
          registerOptions={{
            required: true,
          }}
        />
      </Field>
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
    </SpacerSkleton>
  ));
}
