import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import { titles } from "@/components/domains/registerWork";
import StepNavigator from "@/components/domains/registerWork/stepNavigator";

export function BreadCrumbs() {
  const { currentStep } = StepNavigator.onlyHook();

  return (
    <Container as="ul" align="center" gap={10}>
      {Object.entries(titles).map(([key, val]) => (
        <BreadCrumb key={key} active={currentStep === key}>
          {val}
        </BreadCrumb>
      ))}
    </Container>
  );
}

const Container = styled(SpacerSkleton)``;

const BreadCrumb = styled.li<{ active: boolean }>`
  ${({ theme, active }) => {
    const { colors } = theme;

    return css`
      padding: 10px;
      background-color: ${active ? colors.primary_01 : colors.white};
      color: ${active ? colors.white : colors.primary_01};
      border: 1.4px solid ${colors.primary_01};
      border-radius: 30px;
    `;
  }}
`;
