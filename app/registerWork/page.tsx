"use client";

import styled, { css } from "styled-components";
import { TitleColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import { RegisterWorkForm } from "@/components/domains/registerWork/form";
import StepNavigator from "@/components/domains/registerWork/stepNavigator";

function RegisterWorkPage() {
  return (
    <SpacerSkleton id="main-content" type="vertical" gap={47} align="center">
      <Headline justify="center">작품 등록</Headline>
      <StepNavigator.Provider steps={["default", "detail"]}>
        {(currentStep, currentStepPos) => (
          <RegisterInfo type="vertical" gap={47} align="center">
            <TitleColumn>{`${currentStepPos + 1}. ${currentStep}`}</TitleColumn>
            <RegisterWorkForm>
              {currentStep === "default" ? (
                <RegisterWorkForm.DefaultInfo />
              ) : (
                <RegisterWorkForm.DetailInfo />
              )}
            </RegisterWorkForm>
          </RegisterInfo>
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
