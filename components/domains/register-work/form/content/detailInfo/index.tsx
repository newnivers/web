import { TitleColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import type { FormContentProps } from "../type";

export function DetailInfo({ classifications }: FormContentProps) {
  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical">
      <TitleColumn name={name} desc={desc} />
    </SpacerSkleton>
  ));
}
