import styled from "styled-components";
import type { CommentInfo } from "@/api/detail";
import Typography from "@/components/common/text/Typography";
import ReviewContent from "./ReviewContent";
import ReviewTextarea from "./ReviewTextarea";

export default function ReviewTab({ reviews }: { reviews: CommentInfo[] }) {
  return (
    <>
      <ReviewTextarea />
      <ReviewCountTitle typo="subhead01">{`총 ${reviews.length}개`}</ReviewCountTitle>
      {reviews.map(({ author, score, description }, index) => {
        return (
          <ReviewContent
            key={index}
            author={author}
            score={score}
            description={description}
          />
        );
      })}
    </>
  );
}

const ReviewCountTitle = styled(Typography)`
  display: block;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary["200"]};
`;
