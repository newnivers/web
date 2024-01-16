"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

function MyInfoPage() {
  const router = useRouter();

  return (
    <SpacerSkleton type="vertical" gap={30}>
      <Headline>
        <Typography typo="headline">마이페이지</Typography>
      </Headline>
      <SpacerSkleton align="baseline" gap={161}>
        <SpacerSkleton type="vertical" gap={20} as="nav">
          <Link
            href={{
              pathname: "/my-info",
              query: { content: "work" },
            }}
          >
            <Typography typo="subhead02">예약/신청 내역</Typography>
          </Link>
          <Link
            href={{
              pathname: "/my-info",
              query: { content: "review" },
            }}
          >
            <Typography typo="subhead02">나의 후기</Typography>
          </Link>
        </SpacerSkleton>
        <SpacerSkleton type="vertical" gap={24}>
          <div>사용자 정보</div>
          <div>예약 신청 내역</div>
        </SpacerSkleton>
      </SpacerSkleton>
    </SpacerSkleton>
  );
}

const Headline = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export default MyInfoPage;
