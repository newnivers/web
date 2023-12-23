import "@/styles/global.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { DefaultLayout } from "@/components/common/layout";
import {
  StyledComponentsRegistry,
  RecoilRegistry,
  ReactQueryRegistry,
} from "@/lib";

const fontSet = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Newniverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSet.className}>
      <body>
        <StyledComponentsRegistry>
          <RecoilRegistry>
            <ReactQueryRegistry>
              <DefaultLayout>{children}</DefaultLayout>
              <div id="modal-portal"></div>
            </ReactQueryRegistry>
          </RecoilRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
