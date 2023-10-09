import { type ReactNode } from "react";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";

interface Props {
  children: ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  return <FormWrapper>{children}</FormWrapper>;
}

const FormWrapper = styled(SpacerSkleton)`
  position: relative;
  white-space: nowrap;
`;
