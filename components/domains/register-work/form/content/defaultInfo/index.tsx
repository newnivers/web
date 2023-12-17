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
          path="mock2"
          registerOptions={{
            required: true,
          }}
        />
      </Field>
    </SpacerSkleton>
  ));
}
