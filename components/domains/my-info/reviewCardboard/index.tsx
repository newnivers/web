import { useState, useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import DefaultButton from "@/components/common/button";
import { DefaultModal } from "@/components/common/modal";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface Props {
  image: string;
  title: string;
  start_at?: string;
  price: string;
  visitor_count: number;
  space: string;
  review: string;
}

const workInfos = {
  price: "관람가격",
  visitor_count: "관람인원",
  space: "관람장소",
} as const;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function ReviewCardboard({ image, title, review, ...rest }: Props) {
  const reviewTextRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setShow] = useState(false);

  const onClickMoreReview = () => {
    if (!reviewTextRef.current) {
      return;
    }

    if (reviewTextRef.current.dataset.over === "more") {
      reviewTextRef.current.style.height = "3.6em";
      reviewTextRef.current.style.webkitLineClamp = "3";

      reviewTextRef.current.dataset.over = "normal";

      return;
    }

    reviewTextRef.current.style.height = "fit-content";
    reviewTextRef.current.style.webkitLineClamp = "10";

    reviewTextRef.current.dataset.over = "more";
  };

  const Contents = () => {
    return (Object.entries(workInfos) as Entries<typeof workInfos>).map(
      ([key, name]) => {
        const value = rest[key];

        if (!value) {
          return null;
        }

        return (
          <SpacerSkleton key={key} gap={20}>
            <ContentTypography typo="subhead04">{name}</ContentTypography>
            <ContentTypography typo="subhead04">{value}</ContentTypography>
          </SpacerSkleton>
        );
      }
    );
  };

  return (
    <>
      <DefaultModal
        isShow={isShow}
        showCloseButton={true}
        onClose={() => setShow(false)}
      >
        <SpacerSkleton
          type="vertical"
          align="center"
          gap={30}
          style={{
            width: "364px",
            padding: "32px",
          }}
        >
          <Typography typo="headline">후기 삭제</Typography>
          <Typography typo="body02">후기를 삭제하시겠습니까?</Typography>
          <DefaultButton
            style={{
              width: "100%",
            }}
          >
            확인
          </DefaultButton>
        </SpacerSkleton>
      </DefaultModal>
      <SpacerSkleton gap={38} style={{ width: "100%" }}>
        <Image src={image || ""} width={150} height={212} alt="test-poster" />
        <SpacerSkleton
          type="vertical"
          gap={15}
          style={{
            width: "100%",
          }}
        >
          <SpacerSkleton
            justify="space-between"
            style={{
              width: "100%",
            }}
          >
            <h5>
              <Typography typo="subhead03">{title}</Typography>
            </h5>
            <SpacerSkleton gap={16}>
              {/* <button>
              <Image
                src="/icon/review-edit.svg"
                width={24}
                height={24}
                alt="review-edit"
              />
            </button> */}
              {/* <button onClick={() => setShow(true)}>
                <Image
                  src="icon/review-close.svg"
                  width={24}
                  height={24}
                  alt="review-close"
                />
              </button> */}
            </SpacerSkleton>
          </SpacerSkleton>
          <SpacerSkleton
            type="vertical"
            gap={8}
            style={{
              width: "fit-content",
            }}
          >
            <Contents />
            <SpacerSkleton gap={20}>
              <ContentTypography typo="subhead04">관람후기</ContentTypography>
              <ReviewText ref={reviewTextRef}>{review}</ReviewText>
            </SpacerSkleton>
            <SpacerSkleton
              justify="flex-end"
              gap={3}
              style={{
                width: "100%",
                paddingTop: "19px",
              }}
            >
              <button
                onClick={onClickMoreReview}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography typo="subhead04">더보기</Typography>
                <Image
                  src="/icon/arrow-down-line.svg"
                  width={24}
                  height={24}
                  alt="arrow-down-line"
                />
              </button>
            </SpacerSkleton>
          </SpacerSkleton>
        </SpacerSkleton>
      </SpacerSkleton>
    </>
  );
}

const ReviewText = styled.div`
  width: 600px;
  height: 3.6em;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
  font-weight: 400;
`;

const ContentTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;
