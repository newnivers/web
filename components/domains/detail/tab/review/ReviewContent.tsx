import styled from "styled-components";
import Rating from "@/components/common/rating";
import Typography from "@/components/common/text/Typography";

interface ReviewContentProps {
  id: string;
  nickname: string;
  content: string;
  rating: number;
}

export default function ReviewContent({
  nickname,
  content,
  rating,
}: ReviewContentProps) {
  return (
    <Wrapper>
      <ReviewInfo typo="body02">
        {nickname}
        <Divider />
        {`${rating}점`}
        <Rating rating={rating} />
      </ReviewInfo>
      <Content typo="body02">{content}</Content>
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
