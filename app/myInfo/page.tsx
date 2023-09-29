"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Text, { TextTags } from "@/components/common/text";

function MyInfoPage() {
  return (
    <Container
      id="main-content"
      type="vertical"
      justify="center"
      align="center"
    >
      <Headline justify="center">
        <Title as={TextTags.h1}>MY Page</Title>
      </Headline>
      <Spacer
        align="center"
        gap={30}
        restStyle={{
          width: "100%",
          margin: "30px 0",
        }}
      >
        <Image
          src="/img/thumbnail-default.png"
          width={130}
          height={130}
          alt="thumbnail-default"
        />
        <div>fds</div>
      </Spacer>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  width: 600px;
`;

const Headline = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 474px;
      border-bottom: 1px solid ${colors.secondary_03};
      /* font-size: 3rem; */
      font-size: 2.5rem;
      color: ${colors.primary_02};
    `;
  }}
`;

const Title = styled(Text)`
  font-weight: 700;
`;

export default MyInfoPage;
