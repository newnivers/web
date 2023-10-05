import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import Text, { TextTags } from "../text";

interface Props {
  children: ReactNode;
}

function TitleColumn({ children }: Props) {
  return (
    <Container>
      <Text as={TextTags.h3}>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 100%;
      padding: 14px 26px;
      text-align: left;
      background-color: ${colors.gray_01_1};
      color: ${colors.gray_05_1};
    `;
  }}
`;

export default TitleColumn;
