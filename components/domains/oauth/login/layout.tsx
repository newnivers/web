import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function OAuthLoginLayout({ children }: Props) {
  return <div>{children}</div>;
}
