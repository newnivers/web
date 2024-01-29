"use client";

import type { ReactNode } from "react";
import { TicketPageHeader } from "@/components/domains/ticket-page";

export default function TicketPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TicketPageHeader />
      {children}
    </>
  );
}
