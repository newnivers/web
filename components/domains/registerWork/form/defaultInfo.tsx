import type { UseFormRegister, Control, FieldValues } from "react-hook-form";
import styled from "styled-components";
import { DotColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";

interface Props {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
}

export function DefaultInfo({ register, control }: Props) {
  return (
    <>
      <Row type="vertical" gap={17}>
        <DotColumn tag="작품명">
          <Field>
            <Field.Input
              path="title"
              register={register}
              placeholder="작품명 입력"
              registerOptions={{ required: true }}
            />
          </Field>
        </DotColumn>

        <DotColumn tag="관람연령">
          <Field>
            <Field.Input
              path="age"
              register={register}
              registerOptions={{ required: true }}
            />
          </Field>
        </DotColumn>

        <DotColumn tag="러닝타임">
          <Field>
            <Field.Input
              path="running-time"
              register={register}
              registerOptions={{ required: true }}
            />
          </Field>
        </DotColumn>

        <DotColumn tag="인터미션">
          <Field>
            <Field.Input
              path="intermission"
              register={register}
              registerOptions={{ required: true }}
            />
          </Field>
        </DotColumn>
      </Row>
      <Row type="vertical" gap={17}>
        <DotColumn tag="공연장소">
          <Field>
            <Field.Input
              path="location"
              register={register}
              registerOptions={{ required: true }}
            />
          </Field>
        </DotColumn>

        <DotColumn tag="공연기간">
          <Field>
            <Field.Date rawDate={null} />
          </Field>
        </DotColumn>
        <DotColumn tag="공연시간">
          <SpacerSkleton gap={8} align="center">
            <Field width="100%">
              <Field.Dropdown
                placeholder="날짜 선택"
                options={[
                  { id: 1, name: "2023.09.23" },
                  { id: 2, name: "2023.08.11" },
                  { id: 3, name: "2023.08.11" },
                  { id: 4, name: "2023.08.11" },
                  { id: 5, name: "2023.08.11" },
                ]}
                isShowIcon={true}
              />
            </Field>

            <Field width="70%">
              <Field.TimeOnly
                timeCaption="시간 선택"
                placeholderText="시작 시간"
              />
            </Field>
            <Field width="70%">
              <Field.TimeOnly
                timeCaption="시간 선택"
                placeholderText="종료 시간"
              />
            </Field>
          </SpacerSkleton>
        </DotColumn>
      </Row>
    </>
  );
}

const Row = styled(SpacerSkleton)`
  flex: 1;
`;
