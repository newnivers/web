import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { commonTemplateStyle } from "./shared";

type CSSWidth =
  | "auto"
  | "inherit"
  | "initial"
  | `${number}px`
  | `${number}%`
  | `${number}em`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`;

interface Props {
  width?: CSSWidth;
  children: ReactNode;
}

export function FieldTemplate({ width = "264px", children }: Props) {
  return <Container width={width}>{children}</Container>;
}

const Container = styled.div<{ width: CSSWidth }>`
  ${({ theme, width }) => {
    const { colors } = theme;

    return css`
      ${commonTemplateStyle};

      width: ${width};

      &:has(input:disabled) {
        background-color: ${colors.gray};
        border: none;
      }
    `;
  }}
`;
