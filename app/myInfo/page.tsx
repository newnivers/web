"use client";

import styled, { css } from "styled-components";
import Spacer from "@/components/common/spacer";
import Text, { TextTags } from "@/components/common/text";

function MyInfoPage() {
  return (
    <Container>
      <Headline>
        <Title as={TextTags.h1}>MY Page</Title>
      </Headline>
    </Container>
  );
}

const Container = styled.section`
  width: 800px;
`;

const Headline = styled(Spacer)`
  ${({ theme }) => {
    return css`
      border-bottom: 1px solid ${theme.colors.secondary_03};
    `;
  }}
`;

const Title = styled(Text)`
  font-weight: 800;
`;

export default MyInfoPage;
