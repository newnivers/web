import { type ReactNode } from "react";
import styled from "styled-components";
import DefaultButton from "@/components/common/button";
import { SpacerSkleton } from "@/components/common/spacer";
import StepNavigator from "@/components/domains/registerWork/stepNavigator";

interface Props {
  children: ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  const { isFirstStep, isLastStep, movePrev, moveNext } =
    StepNavigator.onlyHook();

  return (
    <>
      <FormWrapper>{children}</FormWrapper>
      <StepController gap={10}>
        {!isFirstStep && (
          <DefaultButton sort="secondary" onClick={() => movePrev()}>
            이전
          </DefaultButton>
        )}

        {!isLastStep && (
          <DefaultButton onClick={() => moveNext()}>다음</DefaultButton>
        )}
        {isLastStep && (
          <DefaultButton
            onClick={() => {
              // post form
            }}
          >
            전송
          </DefaultButton>
        )}
      </StepController>
    </>
  );
}

const FormWrapper = styled(SpacerSkleton)`
  position: relative;
  white-space: nowrap;
`;

const StepController = styled(SpacerSkleton)``;
