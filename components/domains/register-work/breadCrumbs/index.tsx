import Image from "next/image";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import { titles } from "@/components/domains/register-work/shared";
import { StepNavigator } from "@/components/domains/register-work/stepNavigator";

export function BreadCrumbs() {
  const { currentStep } = StepNavigator.onlyHook();

  return (
    <Container as="ul" align="center" gap={12}>
      {Object.entries(titles).map(([key, val], idx, self) => (
        <BreadCrumb
          key={key}
          justify="center"
          align="center"
          gap={12}
          active={currentStep === key}
        >
          <p>{`0${idx + 1}. ${val}`}</p>
          {self.length - 1 !== idx && (
            <Image
              src={`${
                currentStep === key
                  ? "/icon/right-arrow-active.svg"
                  : "/icon/right-arrow-unactive.svg"
              }`}
              width={16}
              height={16}
              alt="right-arrow"
            />
          )}
        </BreadCrumb>
      ))}
    </Container>
  );
}

const Container = styled(SpacerSkleton)``;

const BreadCrumb = styled(SpacerSkleton)<{ active: boolean }>`
  ${({ theme, active }) => {
    const { colors } = theme;

    return css`
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      color: ${active ? colors.secondary[900] : colors.secondary[400]};
    `;
  }}
`;
