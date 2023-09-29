import type { ReactNode } from "react";
import styled, { css } from "styled-components";

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
      min-width: 264px;
      min-height: 27px;
      padding: 8px 12px;
      border: 1px solid ${colors.secondary_03};
      border-radius: 10px;
    `;
  }}
`;
