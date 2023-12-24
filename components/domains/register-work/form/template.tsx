import type { ReactNode } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import { StepNavigator } from "@/components/domains/register-work/stepNavigator";
// import { useFileUpload } from "@/hooks";

interface Props {
  children: ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  const { isFirstStep, isLastStep, movePrev, moveNext } =
    StepNavigator.onlyHook();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Content type="vertical" gap={52}>
        {children}
      </Content>
      <StepController justify="flex-end" gap={10} align="center">
        {!isFirstStep && (
          <StepButton type="button" onClick={() => movePrev()}>
            <Image
              src="/icon/double-arrow-left.svg"
              width={16}
              height={16}
              alt="double-arrow-left"
            />
            <p>이전 페이지</p>
          </StepButton>
        )}

        {!isLastStep && (
          <StepButton type="button" onClick={() => moveNext()}>
            <p>다음 페이지</p>
            <Image
              src="/icon/double-arrow-right.svg"
              width={16}
              height={16}
              alt="dobule-arrow-right"
            />
          </StepButton>
        )}
        {isLastStep && (
          <>
            <StepButton type="button">미리보기</StepButton>
            <StepButton type="submit">작품등록</StepButton>
          </>
        )}
      </StepController>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 78px;
  width: 100%;
`;

const Content = styled(SpacerSkleton)`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;

const StepController = styled(SpacerSkleton)``;

const StepButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 148px;
      height: 56px;
      border: 1px solid ${colors.secondary[400]};
      border-radius: 4px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
