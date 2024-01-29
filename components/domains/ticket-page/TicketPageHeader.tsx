"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";

type TicketPageCategory = "HOME" | "SHOWING" | "ARCHIVING";

export function TicketPageHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [category, setCategory] = useState<TicketPageCategory>("HOME");

  useEffect(() => {
    const currentTab = pathname.split("/").at(-1);

    switch (currentTab) {
      case "showing":
        setCategory("SHOWING");
        break;
      default:
        setCategory("HOME");
    }
  }, []);

  return (
    <Container>
      <TicketHeaderText typo="headline">Ticket</TicketHeaderText>
      <Navigator>
        <Tab
          selected={category === "HOME"}
          onClick={() => {
            setCategory("HOME");
            router.push("/ticket");
          }}
        >
          Home
        </Tab>
        <Tab
          selected={category === "SHOWING"}
          onClick={() => {
            setCategory("SHOWING");
            router.push("/ticket/showing");
          }}
        >
          Showing
        </Tab>
        <Tab selected={category === "ARCHIVING"} onClick={() => {}}>
          Archiving
        </Tab>
      </Navigator>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TicketHeaderText = styled(Typography)`
  height: 168px;
  display: block;
  text-align: center;
  line-height: 168px;
`;

const Navigator = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid ${colors.secondary["200"]};
      display: flex;
      justify-content: center;
    `;
  }}
`;

const Tab = styled.span<{ selected: boolean }>`
  ${({ selected, theme }) => {
    const { colors } = theme;

    return css`
      padding-bottom: 0.6rem;
      width: 9rem;
      text-align: center;
      display: inline-block;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 150%;
      color: ${selected ? colors.secondary.black : colors.secondary[400]};
      border-bottom: ${selected
        ? `2px solid ${colors.secondary.black}`
        : "none"};
    `;
  }}
`;
