"use client";

import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import DefaultButton from "@/components/common/button";
import { TitleColumn, DotColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import { SpacerSkleton } from "@/components/common/spacer";

function RegisterPage() {
  const { register, handleSubmit, resetField, watch } = useForm();

  return (
    <SpacerSkleton id="main-content" type="vertical" gap={47} align="center">
      <Headline justify="center">작품 등록</Headline>
      <RegisterInfo type="vertical" gap={47} align="center">
        <TitleColumn>1. 기본정보</TitleColumn>
        <FormWrapper>
          <Row type="vertical" gap={17}>
            <SpacerSkleton gap={14}>
              <DotColumn tag="작품명">
                <Field>
                  <Field.Input
                    path="title"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
            <SpacerSkleton gap={14}>
              <DotColumn tag="관람연령">
                <Field>
                  <Field.Input
                    path="age"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
            <SpacerSkleton gap={14}>
              <DotColumn tag="러닝타임">
                <Field>
                  <Field.Input
                    path="running-time"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
            <SpacerSkleton gap={14}>
              <DotColumn tag="인터미션">
                <Field>
                  <Field.Input
                    path="intermission"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
          </Row>
          <Row type="vertical" gap={17}>
            <SpacerSkleton gap={14}>
              <DotColumn tag="공연장소">
                <Field>
                  <Field.Input
                    path="location"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
            <SpacerSkleton gap={14}>
              <DotColumn tag="공연기간">
                <Field>
                  <Field.Input
                    path="duration"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
            <SpacerSkleton gap={14}>
              <DotColumn tag="공연시간">
                <Field>
                  <Field.Input
                    path="time"
                    register={register}
                    registerOptions={{ required: true }}
                  />
                </Field>
              </DotColumn>
            </SpacerSkleton>
          </Row>
        </FormWrapper>
        <DefaultButton type="submit">전송</DefaultButton>
      </RegisterInfo>
    </SpacerSkleton>
  );
}

const Headline = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 474px;
      border-bottom: 1px solid ${colors.secondary_03};
      font-size: 2.5rem;
      font-weight: 600;
      color: ${colors.primary_02};
    `;
  }}
`;

const RegisterInfo = styled(SpacerSkleton)`
  width: 100%;
`;

const FormWrapper = styled(SpacerSkleton)`
  width: 80%;
  margin: 0 auto;
`;

const Row = styled(SpacerSkleton)`
  flex: 1;
`;

export default RegisterPage;
