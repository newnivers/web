"use client";

import type { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props {
  type?: "vertical" | "horizontal";
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  children: ReactNode;
  margin?: number | string;
}

const Spacer = styled.div<Props>`
  ${({ type, justify, align, gap, margin }) => {
    return css`
      display: flex;
      flex-direction: ${type === "vertical" && "column"};
      justify-content: ${justify};
      align-items: ${align};
      gap: ${`${gap}px`};
      margin: ${typeof margin === "string" ? margin : `${margin}px`};
    `;
  }}
`;

export default Spacer;
