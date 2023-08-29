/* eslint-disable @typescript-eslint/no-explicit-any */
import "styled-components";
import type { StyledTheme } from "./index";

declare module "styled-components" {
  export interface DefaultTheme extends StyledTheme {
    [x: string]: any;
  }
}
