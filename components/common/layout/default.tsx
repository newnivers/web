"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Footer from "@/components/common/layout/Footer";
import NavBar from "@/components/common/layout/NavBar";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  const pathname = usePathname();

  const renderNavBar = () => {
    if (pathname === "/login/redirect") {
      return null;
    }

    return <NavBar />;
  };

  return (
    <>
      {renderNavBar()}
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

const Container = styled.section`
  position: relative;
  min-width: 1400px;
  min-height: calc(100% - 407px);
  padding: 0 10rem;
  background-color: ${({ theme }) => theme.colors.white};

  & *[id="main-content"] {
    width: 1200px;
    margin: 0 auto;
    min-height: 42rem;
  }
`;

export default DefaultLayout;
