"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.section`
  min-width: fit-content;
  margin: 0 auto;
`;

export default DefaultLayout;
