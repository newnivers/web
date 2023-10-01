"use client";

import type { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props {
  type?: "vertical" | "horizontal";
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  children: ReactNode;
  restStyle?: CSSProperties;
}

function Spacer({ type, gap, align, justify, children, restStyle }: Props) {
  return (
    <SpacerSkleton
      type={type}
      gap={gap}
      align={align}
      justify={justify}
      style={restStyle}
    >
      {children}
    </SpacerSkleton>
  );
}

export const SpacerSkleton = styled.div<Props>`
  ${({ type, justify, align, gap }) => {
    return css`
      display: flex;
      flex-direction: ${type === "vertical" && "column"};
      justify-content: ${justify};
      align-items: ${align};
      gap: ${`${gap}px`};
    `;
  }}
`;

export default Spacer;
