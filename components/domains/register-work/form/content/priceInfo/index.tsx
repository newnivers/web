import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { FormContentProps } from "../type";

export function PriceInfo({ classifications }: FormContentProps) {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      is_free: true,
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />
      <InputColumn id="is_free" name="무료작품">
        <SpacerSkleton align="center" gap={10}>
          <Field.Checkbox
            control={control}
            name="is_free"
            showLabel={false}
            status="disabled"
          />
          <ReadyToCostTypography typo="body03">
            {`(유료작품은 준비중입니다!)`}
          </ReadyToCostTypography>
        </SpacerSkleton>
      </InputColumn>
    </SpacerSkleton>
  ));
}

const ReadyToCostTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;
