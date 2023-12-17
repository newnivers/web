import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TitleColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      mock: "",
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={16}>
      <TitleColumn name={name} desc={desc} />
      <Field style={{ width: "200px" }}>
        <Field.ControlledInput control={control} name="mock" />
      </Field>
    </SpacerSkleton>
  ));
}
