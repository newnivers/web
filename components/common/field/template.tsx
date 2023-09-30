import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { commonTemplateStyle } from "./shared";

interface Props {
  children: ReactNode;
}

export function FieldTemplate({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      ${commonTemplateStyle};

      &:has(input:disabled) {
        background-color: ${colors.gray};
        border: none;
      }
    `;
  }}
`;
