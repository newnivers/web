import styled, { css } from "styled-components";
import type { HTMLAttributes, ReactNode } from "react";
import type { TypoToken } from "@/styles/theme/typography";

interface TypoProps extends HTMLAttributes<HTMLSpanElement> {
  typo?: TypoToken;
}

export default function Typography({
  typo = "headline",
  children,
  ...rest
}: TypoProps) {
  return (
    <TextSpan typo={typo} {...rest}>
      {children}
    </TextSpan>
  );
}

const TextSpan = styled.span<{ typo: TypoToken }>`
  ${({ typo, theme }) => theme.typoToken[typo]}
`;
