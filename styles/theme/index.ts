import { colors } from "./colors";
import { media } from "./media";
import { typoToken } from "./typography";

const styledTheme = {
  colors,
  media,
  typoToken,
} as const;

export default styledTheme;

export type StyledTheme = typeof styledTheme;
