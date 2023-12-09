const colors = {
  // legacy color system
  primary_01: "#4F9EF7",
  primary_02: "#486284",
  error: "#FF0000",
  secondary_02: "#E1E9F3",
  secondary_03: "#DDE0E4",
  secondary_yellow_01: "#F3DC54",
  secondary_blue_01: "#587DAB",
  white: "#FFFFFF",
  gray: "#f0f0f0",
  gray_01: "#e5e5e5",
  gray_01_1: "#f5f5f5",
  gray_02: "#cccccc",
  gray_03: "#b2b2b2",
  gray_04: "#999999",
  gray_05: "#7f7f7f",
  gray_05_1: "#697077",
  gray_06: "#666666",
  gray_07: "#4c4c4c",
  gray_08: "#333333",
  black_01: "#4d4d4d",
  black_02: "#3c3c3c",
  black_03: "#1e1e1e",
  black_04: "#111111",
  black_05: "#000000",
  // updated color system
  primary: {
    point: "#FF9900",
  },
  secondary: {
    black: "#0A0A0A",
    white: "#FFFFFF",
    900: "#1D1D1D",
    500: "#505050",
    400: "#A6A6A6",
    200: "#D4D4D4",
    150: "#E8E8E8",
    100: "#F9F9F9",
  },
  system: {
    red: "#DD2424",
  },
} as const;

export default colors;
