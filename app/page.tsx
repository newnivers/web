"use client";

import styled, { css } from "styled-components";

export default function Home() {
  return <Container>Home Page</Container>;
}

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      background-color: ${colors.primary_01};
    `;
  }}
`;
