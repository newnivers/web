"use client";

import styled from "styled-components";
import { LandingPage, MainBanner } from "@/components/domains/landing-page";

export default function Home() {
  return (
    <Container>
      <MainBanner
        title="SEOUL INSTITUTE OF THE ARTS"
        date="2023.11.05 (Sun) ~ 2023.11.12 (Sun)"
      ></MainBanner>
      <LandingPage />
    </Container>
  );
}

const Container = styled.div``;
