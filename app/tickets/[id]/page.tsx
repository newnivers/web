"use client";

import Image from "next/image";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

function QRPage() {
  return (
    <SpacerSkleton
      type="vertical"
      justify="center"
      align="center"
      gap={40}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Image
        src="/icon/plavnewniverse_black_logo.svg"
        width={120}
        height={50}
        alt="logo"
      />
      <Typography typo="subhead01">티켓 인증에 성공하였습니다!</Typography>
    </SpacerSkleton>
  );
}

export default QRPage;
