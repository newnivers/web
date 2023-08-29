const breakPoints = {
  mobile: 375,
};

const media = {
  desktop: `@media only screen and (min-width: ${breakPoints.mobile + 1}px)`,
  mobile: `@media only screen and (max-width: ${breakPoints.mobile}px)`,
} as const;

export default media;
