import type { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  className: string;
  children: ReactNode;
}

export default function ModalCustomContainer({ className, children }: Props) {
  return <Container className={className}>{children}</Container>;
}

const Container = styled.div`
  border: 1px solid ${({ theme: { colors } }) => colors.secondary[500]};
  border-radius: 12px;
`;
