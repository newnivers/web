import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface Props {
  id: number;
  image: string;
  title: string;
  price?: string;
  visitor_count: number;
  space: string;
}

const workInfos = {
  price: "관람가격",
  visitor_count: "관람인원",
  space: "관람장소",
} as const;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function Cardboard({ id, image, title, ...rest }: Props) {
  const router = useRouter();

  const onClickMoveQR = () => {
    router.replace(`/my-info/QR/${id}`);
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
    <SpacerSkleton justify="space-between" style={{ width: "100%" }}>
      <SpacerSkleton gap={38}>
        <Image src={image || ""} width={150} height={212} alt="poster" />
        <SpacerSkleton type="vertical" gap={15}>
          <h5>
            <Typography typo="subhead03">{title}</Typography>
          </h5>
          <SpacerSkleton type="vertical" gap={8}>
            <Contents />
          </SpacerSkleton>
        </SpacerSkleton>
      </SpacerSkleton>
      <SpacerSkleton type="vertical" justify="flex-end">
        <QRButton onClick={onClickMoveQR}>QR인증</QRButton>
      </SpacerSkleton>
    </SpacerSkleton>
  );
}

const ContentTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;

const QRButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 148px;
      height: 56px;
      padding: 20px 24px;
      border: 1px solid ${colors.secondary[400]};
      border-radius: 4px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
