import { TitleColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={16}>
      <TitleColumn name={name} desc={desc} />
      <Field>
        <input className="reset icon" />
      </Field>
    </SpacerSkleton>
  ));
}
