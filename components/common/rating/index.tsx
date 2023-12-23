import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import styled from "styled-components";
import Star from "./Star";

interface RatingProps {
  rating: number;
  isInteractive?: boolean;
  setRating?: Dispatch<SetStateAction<number>>;
}

export default function Rating({
  rating,
  isInteractive = false,
  setRating,
}: RatingProps) {
  const ratingArr = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => index < rating);
  }, [rating]);

  const onClickStar = (index: number) => {
    if (isInteractive && setRating) {
      setRating(index);
    }
  };

  return (
    <Wrapper>
      {ratingArr.map((fill, index) => {
        return (
          <Star
            key={index}
            isFilled={fill}
            onClick={() => onClickStar(index + 1)}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  #rating-start {
    margin-right: 0.12rem;
  }
`;
