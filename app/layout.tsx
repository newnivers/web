import "@/styles/global.css";

import type { Metadata } from "next";
import {
  StyledComponentsRegistry,
  RecoilRegistry,
  ReactQueryRegistry,
} from "@/lib";

export const metadata: Metadata = {
  title: "Newniverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <RecoilRegistry>
            <ReactQueryRegistry>{children}</ReactQueryRegistry>
          </RecoilRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
