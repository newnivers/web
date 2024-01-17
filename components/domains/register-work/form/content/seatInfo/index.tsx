import styled from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { WorkForm } from "../../context";
import type { FormContentProps } from "../type";

export function SeatInfo({ classifications }: FormContentProps) {
  const {
    workForm: { register, control },
  } = WorkForm.onlyHook();

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />
      <SpacerSkleton gap={30}>
        <InputColumn
          id="unreserved_seat"
          name="좌석종류"
          spacer={{ style: { width: "100%" } }}
        >
          <SpacerSkleton align="center" gap={10}>
            <Field.Checkbox
              control={control}
              name="unreserved_seat"
              labelName="비지정석"
              status="disabled"
            />
            <ReadyToCostTypography typo="body03">
              {`(지정석은 준비중입니다!)`}
            </ReadyToCostTypography>
          </SpacerSkleton>
        </InputColumn>
        <InputColumn
          id="seat_sort"
          name="좌석종류"
          spacer={{ style: { width: "100%" } }}
        >
          <Field disabled={true}>
            <Field.DefaultText
              className="reset"
              defaultValue="입력 불가능"
              disabled={true}
            />
          </Field>
        </InputColumn>
      </SpacerSkleton>
      <InputColumn
        id="seat_layout"
        name="좌석배치도"
        spacer={{ style: { width: "100%" } }}
      >
        <Field disabled={true}>
          <Field.DefaultText
            className="reset"
            defaultValue="비지정석"
            disabled={true}
          />
        </Field>
      </InputColumn>
      <InputColumn
        id="all_seat_num"
        name="총 좌석수"
        spacer={{ style: { width: "100%" } }}
        unit="석"
      >
        <Field>
          <Field.UncontrolledText
            path="all_seat_num"
            register={register}
            registerOptions={{
              required: true,
            }}
            type="number"
          />
        </Field>
      </InputColumn>
    </SpacerSkleton>
  ));
}

const ReadyToCostTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;
