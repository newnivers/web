import styled from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { WorkForm } from "../../context";
import type { FormContentProps } from "../type";

export function PriceInfo({ classifications }: FormContentProps) {
  const {
    workForm: { register, control },
  } = WorkForm.onlyHook();

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />

      <InputColumn id="is_free" name="무료작품">
        <SpacerSkleton align="center" gap={10}>
          <Field.Checkbox control={control} name="is_free" status="disabled" />
          <ReadyToCostTypography typo="body03">
            {`(유료작품은 준비중입니다!)`}
          </ReadyToCostTypography>
        </SpacerSkleton>
      </InputColumn>
      <SpacerSkleton gap={30}>
        <InputColumn id="price" name="작품가격" unit="원">
          <Field style={{ width: "478px" }}>
            <Field.UncontrolledText
              path="price"
              register={register}
              registerOptions={{
                required: true,
              }}
              type="number"
              placeholder="좌석 기본 판매가격을 입력해주세요"
            />
          </Field>
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
              placeholder="인당매수를 입력해주세요 (ex. 1인 1매)"
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
