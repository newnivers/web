"use client";

import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "../spacer";
import Text from "../text";

interface Props {
  tag: string;
  children: ReactNode;
}

function DotColumn({ tag, children }: Props) {
  return (
    <SpacerSkleton gap={16} align="baseline">
      <SpacerSkleton gap={10} align="center">
        <Dot />
        <Tag>{tag}</Tag>
        <Divider />
      </SpacerSkleton>
      {children}
    </SpacerSkleton>
  );
}

const Dot = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 5px;
      height: 5px;
      background-color: ${colors.primary_01};
      border-radius: 50%;
    `;
  }}
`;

const Tag = styled(Text)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-weight: 700;
      vertical-align: middle;
      color: ${colors.primary_01};
    `;
  }}
`;

const Divider = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 2px;
      height: 14px;
      transform: translateY(-1px);
      background-color: ${colors.primary_01};
    `;
  }}
`;

export default DotColumn;
