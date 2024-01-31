import type { ReactNode } from "react";
import Image from "next/image";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface Props {
  children: ReactNode;
}

export function OAuthLoginLayout({ children }: Props) {
  return (
    <SpacerSkleton
      id="main-content"
      type="vertical"
      justify="center"
      align="center"
      gap={40}
    >
      <Image
        src="/icon/plavnewniverse_black_logo.svg"
        width={150}
        height={150}
        alt="playvnewniverse_black_logo"
      />
      <SpacerSkleton type="vertical" align="center">
        <Typography typo="subhead01">
          NEWNIVERSE 서비스를 이용하기 위해
        </Typography>
        <Typography typo="subhead01">로그인을 진행해 주세요</Typography>
      </SpacerSkleton>
      {children}
    </SpacerSkleton>
  );
}
