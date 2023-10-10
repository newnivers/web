"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props extends HTMLAttributes<HTMLElement> {
  type?: "vertical" | "horizontal";
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  children: ReactNode;
  restStyle?: CSSProperties;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "footer" | "aside" | "form";
}

function Spacer({
  type,
  gap,
  align,
  justify,
  children,
  restStyle,
  className,
  as = "div",
}: Props) {
  return (
    <SpacerSkleton
      className={className}
      type={type}
      gap={gap}
      align={align}
      justify={justify}
      style={restStyle}
      as={as}
    >
      {children}
    </SpacerSkleton>
  );
}

export const SpacerSkleton = styled.div<Omit<Props, "as">>`
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
