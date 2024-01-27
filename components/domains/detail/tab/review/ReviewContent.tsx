import styled from "styled-components";
import type { CommentInfo } from "@/api/detail";
import Rating from "@/components/common/rating";
import Typography from "@/components/common/text/Typography";

type ReviewContentProps = Omit<CommentInfo, "art">;

export default function ReviewContent({
  author,
  description,
  score,
}: ReviewContentProps) {
  return (
    <Wrapper>
      <ReviewInfo typo="body02">
        {author}
        <Divider />
        {`${score}점`}
        <Rating rating={score} />
      </ReviewInfo>
      <Content typo="body02">{description}</Content>
    </Wrapper>
  );
}

const ReviewInfo = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  div:last-child {
    margin-left: 0.5rem;
  }
`;
const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary[200]};
`;
const Content = styled(Typography)`
  display: block;
  margin-bottom: 0.75rem;
`;
const Divider = styled.div`
  display: inline-block;
  width: 0.0625rem;
  height: 0.75rem;
  margin: 0 0.31rem;
  background-color: ${({ theme }) => theme.colors.secondary[200]};
`;
