"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ThemeProvider,
  ServerStyleSheet,
  StyleSheetManager,
} from "styled-components";
import styledTheme from "@/styles/theme";

export default function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  const [styleComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleComponentsStyleSheet.getStyleElement();
    styleComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  if (typeof window !== "undefined") {
    return <ThemeProvider theme={styledTheme}>{children}</ThemeProvider>;
  }

  return (
    <StyleSheetManager sheet={styleComponentsStyleSheet.instance}>
      <ThemeProvider theme={styledTheme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}
