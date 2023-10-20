export const ERROR_MESSAGE = {
  SERVER_RENDER_RENDER: "currently server render",
  NO_CACHED_VALUE_LOCAL_STORAGE: "no cached value of key in localStorage",
} as const;

export type ErrorCandidates = keyof typeof ERROR_MESSAGE;
