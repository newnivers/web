import type { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface Props {
  image: string;
  title: string;
  start_at: string;
  price: string;
  visitor_count: number;
  space: string;
  review?: string;
  children: ReactNode;
}

const workInfos = {
  start_at: "관람일시",
  price: "관람가격",
  visitor_count: "관람인원",
  space: "관람장소",
  review: "후기",
} as const;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function Cardboard({ image, title, children, ...rest }: Props) {
  const Contents = () => {
    return (Object.entries(workInfos) as Entries<typeof workInfos>).map(
      ([key, name]) => {
        const value = rest[key];

        if (!value) {
          return null;
        }

        return (
          <Content key={key}>
            <ContentTypography typo="subhead04">{name}</ContentTypography>
            <ContentTypography typo="subhead04">{value}</ContentTypography>
          </Content>
        );
      }
    );
  };

  return (
    <SpacerSkleton gap={38} style={{ width: "100%" }}>
      <Image src={image} width={150} height={212} alt="test-poster" />
      <SpacerSkleton type="vertical" gap={15}>
        <h5>
          <Typography typo="subhead03">{title}</Typography>
        </h5>
        <SpacerSkleton type="vertical" gap={8}>
          <Contents />
        </SpacerSkleton>
      </SpacerSkleton>
    </SpacerSkleton>
  );
}

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 8px;
`;

const ContentTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;
