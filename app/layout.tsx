import "@/styles/global.css";

import type { Metadata } from "next";
import { DefaultLayout } from "@/components/common/layout";
import { AuthUserInfo } from "@/contexts";
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
            <ReactQueryRegistry>
              <DefaultLayout>
                <AuthUserInfo.Provider>{children}</AuthUserInfo.Provider>
              </DefaultLayout>
            </ReactQueryRegistry>
          </RecoilRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
