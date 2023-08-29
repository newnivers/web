import colors from "./colors";
import media from "./media";

const styledTheme = {
  colors,
  media,
} as const;

export default styledTheme;

export type StyledTheme = typeof styledTheme;
