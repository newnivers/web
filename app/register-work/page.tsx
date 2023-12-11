"use client";

import styled, { css } from "styled-components";
import { TitleColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import {
  RegisterWorkForm,
  BreadCrumbs,
  titles,
  steps,
  StepNavigator,
} from "@/components/domains/register-work";

function RegisterWorkPage() {
  return (
    <SpacerSkleton id="main-content" type="vertical" gap={47} align="center">
      <StepNavigator.Provider steps={steps}>
        {(currentStep, currentStepPos) => (
          <>
            <Headline justify="center">작품 등록</Headline>
            <BreadCrumbs />
            <RegisterInfo type="vertical" gap={47} align="center">
              <TitleColumn>{`${currentStepPos + 1}. ${
                titles[currentStep]
              }`}</TitleColumn>
              <RegisterWorkForm>
                {(register, control, cachedImages) =>
                  currentStep === "default" ? (
                    <RegisterWorkForm.DefaultInfo
                      register={register}
                      control={control}
                    />
                  ) : (
                    <RegisterWorkForm.DetailInfo
                      control={control}
                      cachedImages={cachedImages}
                    />
                  )
                }
              </RegisterWorkForm>
            </RegisterInfo>
          </>
        )}
      </StepNavigator.Provider>
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

export default RegisterWorkPage;
