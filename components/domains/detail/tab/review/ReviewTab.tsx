import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import ReviewContent from "./ReviewContent";
import ReviewTextarea from "./ReviewTextarea";

const reviewFixture = [
  {
    id: "12",
    nickname: "얼럴얼",
    rating: 3,
    content: "이건 쓰래기야!",
  },
  {
    id: "1",
    nickname: "얼럴얼djf",
    rating: 0,
    content: "이건 쓰래기야!!@!#!#",
  },
];

export default function ReviewTab() {
  return (
    <>
      <ReviewTextarea />
      <ReviewCountTitle typo="subhead01">{`총 ${reviewFixture.length}개`}</ReviewCountTitle>
      {reviewFixture.map(({ id, nickname, rating, content }) => {
        return (
          <ReviewContent
            id={id}
            key={id}
            nickname={nickname}
            rating={rating}
            content={content}
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
