import type { CommentInfo } from "@/api";
import httpClient from "@/api/core";

export const postComment = (req: CommentInfo) => {
  return httpClient.post(`/arts/${req.art}/comments`, {
    data: req,
  });
};
