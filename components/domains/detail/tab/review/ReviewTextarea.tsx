import type { ChangeEvent } from "react";
import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import Rating from "@/components/common/rating";
import Typography from "@/components/common/text/Typography";
import { AuthUserInfo } from "@/contexts";
import { usePostComment } from "@/queries";

export default function ReviewTextarea({ artId }: { artId: number }) {
  const { authUser } = useContext(AuthUserInfo.Context);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const postComment = usePostComment(artId);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const postReview = () => {
    if (authUser?.id) {
      postComment({
        score: rating,
        description: review,
        art: artId,
        author: Number(authUser.id),
      });
    }
  };

  return (
    <ReviewContainer>
      <Wrapper>
        <MyRating typo="body02">
          닉네임 <Divider />
          나의 별점
          <Rating rating={rating} isInteractive setRating={setRating} />
        </MyRating>
        <TextCounter typo="body02">{review.length}/1000</TextCounter>
      </Wrapper>
      <Textarea value={review} onChange={onChangeHandler} />
      <Wrapper>
        <Caution typo="body03">
          ※ 게시판 운영 규정에 맞지 않는 글은 사전 통보없이 삭제될 수 있습니다.
          <br />※ 게시물로 인해 발생하는 문제는 작성자 본인에게 책임이 있습니다.
        </Caution>
        <ReviewRegisterButton onClick={postReview}>
          <Typography typo="body02">후기등록</Typography>
        </ReviewRegisterButton>
      </Wrapper>
    </ReviewContainer>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewContainer = styled.div``;

const ReviewRegisterButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      height: 2rem;
      padding: 0.25rem 1rem;
      color: ${colors.secondary[500]};
      border-radius: 1.5rem;
      border: 1px solid ${colors.secondary[400]};
    `;
  }}
`;
const Caution = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
`;

const MyRating = styled(Typography)`
  display: flex;
  align-items: center;

  div:last-child {
    margin-left: 0.5rem;
  }
`;

const TextCounter = styled(Typography)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondary[400]};
`;

const Textarea = styled.textarea`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 100%;
      height: 10rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.75rem;
      border: 1px solid ${colors.secondary[200]};
      outline: none;
      margin: 0.5rem 0;
    `;
  }}
`;

const Divider = styled.div`
  display: inline-block;
  width: 0.0625rem;
  height: 0.75rem;
  margin: 0 0.31rem;
  background-color: ${({ theme }) => theme.colors.secondary[200]};
`;
