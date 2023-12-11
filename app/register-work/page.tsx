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
    <SpacerSkleton id="main-content" type="vertical" gap={52} align="center">
      <StepNavigator.Provider steps={steps}>
        {(currentStep, currentStepPos) => (
          <>
            <Headline type="vertical" justify="center" align="center" gap={40}>
              <p id="title">작품등록</p>
              <BreadCrumbs />
            </Headline>

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
      /* width: 474px; */

      & > p#title {
        font-size: 32px;
        font-weight: 600;
        color: ${colors.secondary[900]};
      }
    `;
  }}
`;

const RegisterInfo = styled(SpacerSkleton)`
  width: 100%;
`;

export default RegisterWorkPage;
