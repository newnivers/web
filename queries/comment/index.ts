import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommentInfo } from "@/api";
import { postComment } from "@/api/comment";

export const usePostComment = (artId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (commentInfo: CommentInfo) => postComment(commentInfo),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["detail", artId] }),
    }
  );

  return mutate;
};
