"use client";

import type { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface Props {
  children: ReactNode;
}

export default function RecoilRegistry({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
