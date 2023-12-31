import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import { ImageRegister } from "./imageRegister";
import type { FormContentProps } from "../type";

export function DetailInfo({ classifications }: FormContentProps) {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      image: { name: "", data: null },
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />
      <InputColumn id="image" name="이미지 등록" spacer={{ gap: 30 }}>
        <ImageRegister control={control} name="image" />
      </InputColumn>
    </SpacerSkleton>
  ));
}
