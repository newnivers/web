"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Footer from "@/components/common/layout/Footer";
import NavBar from "@/components/common/layout/NavBar";

interface Props {
  children: ReactNode;
}

const QR_PAGE = "/my-info/QR/";
const TICKETS_PAGE = "/tickets/";

function DefaultLayout({ children }: Props) {
  const pathname = usePathname();

  if (pathname.includes(QR_PAGE) || pathname.includes(TICKETS_PAGE)) {
    return children;
  }

  return (
    <>
      <NavBar />
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
