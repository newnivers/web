"use client";

import { createElement } from "react";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import {
  BreadCrumbs,
  steps,
  StepNavigator,
  WorkForm,
  RegisterWorkFormTemplate,
  WorkFormComponents,
  classificationInfo,
} from "@/components/domains/register-work";

function RegisterWorkPage() {
  return (
    <SpacerSkleton
      type="vertical"
      gap={52}
      align="center"
      style={{ width: "1168px", margin: "0 auto" }}
    >
      <StepNavigator.Provider steps={steps}>
        {(currentStep) => (
          <>
            <Headline type="vertical" justify="center" align="center" gap={40}>
              <p id="title">작품등록</p>
              <BreadCrumbs />
            </Headline>

            <RegisterInfo type="vertical" gap={47} align="center">
              <WorkForm.Provider>
                <RegisterWorkFormTemplate>
                  {createElement(WorkFormComponents[currentStep], {
                    classifications: classificationInfo[currentStep],
                  })}
                </RegisterWorkFormTemplate>
              </WorkForm.Provider>
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
