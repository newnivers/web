"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import NavBar from "@/components/common/layout/NavBar";
import { AuthUserInfo } from "@/contexts";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <Container>
      <NavBar />
      <AuthUserInfo.Provider>{children}</AuthUserInfo.Provider>
    </Container>
  );
}

const Container = styled.section`
  min-width: 1400px;
  padding: 0 10rem;

  & *[id="main-content"] {
    width: 1200px;
    margin: 0 auto;
  }
`;

export default DefaultLayout;
