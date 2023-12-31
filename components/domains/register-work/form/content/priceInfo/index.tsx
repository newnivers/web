import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { FormContentProps } from "../type";

export function PriceInfo({ classifications }: FormContentProps) {
  const { control, register } = useForm<FieldValues>({
    defaultValues: {
      is_free: true,
      purchase_limit_count: "",
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />
      <SpacerSkleton gap={30}>
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
        <InputColumn
          id="purchase_limit_count"
          name="인당매수"
          spacer={{ style: { width: "100%" } }}
        >
          <Field>
            <Field.UncontrolledText
              path="purchase_limit_count"
              register={register}
              registerOptions={{
                required: true,
              }}
              type="number"
              placeholder="인당매수를 입력해주세요.(ex. 1인 1매)"
            />
          </Field>
        </InputColumn>
      </SpacerSkleton>
    </SpacerSkleton>
  ));
}

const ReadyToCostTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;
