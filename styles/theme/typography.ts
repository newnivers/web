import { colors } from "./colors";

export const typoToken = {
  headline: {
    color: `${colors.secondary["900"]}`,
    "font-size": "2rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  subhead01: {
    color: `${colors.secondary["900"]}`,
    "font-size": "1.5rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  subhead02: {
    color: `${colors.secondary["900"]}`,
    "font-size": "1.25rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  subhead03: {
    color: `${colors.secondary["900"]}`,
    "font-size": "1rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  subhead04: {
    color: `${colors.secondary["900"]}`,
    "font-size": "0.875rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  subhead05: {
    color: `${colors.secondary["900"]}`,
    "font-size": "0.75rem",
    "font-weight": "600",
    "line-height": "150%",
  },
  body01: {
    color: `${colors.secondary["900"]}`,
    "font-size": "1.5rem",
    "font-weight": "400",
    "line-height": "150%",
  },
  body02: {
    color: `${colors.secondary["900"]}`,
    "font-size": "1rem",
    "font-weight": "400",
    "line-height": "150%",
  },
  body03: {
    color: `${colors.secondary["900"]}`,
    "font-size": "0.75rem",
    "font-weight": "400",
    "line-height": "150%",
  },
};

export type TypoToken = keyof typeof typoToken;
