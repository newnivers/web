"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { Account, Cardboard } from "@/components/domains/my-info";
import { AuthUserInfo } from "@/contexts";

function MyInfoPage() {
  const router = useRouter();

  return (
    <AuthUserInfo.Provider>
      <SpacerSkleton id="main-content" type="vertical" gap={30}>
        <Headline>
          <Typography typo="headline">마이페이지</Typography>
        </Headline>
        <SpacerSkleton justify="space-between" gap={161}>
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
          <SpacerSkleton type="vertical" gap={24} style={{ flex: 2 }}>
            <Account />
            <SpacerSkleton type="vertical" gap={24}>
              <div>
                <h4>
                  <Typography typo="subhead01">예약/신청 내역</Typography>
                </h4>
              </div>
              <History>
                <ul>
                  <CardboardList>
                    <Cardboard
                      image="/img/test-poster.png"
                      title="현대무용 <시차적 관점>"
                      start_at="2023.01.15 (목) 오전 10:00"
                      price="무료"
                      visitor_count={100}
                      space="서울예술대학교 빨간대문"
                    >
                      test
                    </Cardboard>
                  </CardboardList>
                  <CardboardList>
                    <Cardboard
                      image="/img/test-poster.png"
                      title="현대무용 <시차적 관점>"
                      start_at="2023.01.15 (목) 오전 10:00"
                      price="무료"
                      visitor_count={100}
                      space="서울예술대학교 빨간대문"
                    >
                      test
                    </Cardboard>
                  </CardboardList>
                  <CardboardList>
                    <Cardboard
                      image="/img/test-poster.png"
                      title="현대무용 <시차적 관점>"
                      start_at="2023.01.15 (목) 오전 10:00"
                      price="무료"
                      visitor_count={100}
                      space="서울예술대학교 빨간대문"
                    >
                      test
                    </Cardboard>
                  </CardboardList>
                  <CardboardList>
                    <Cardboard
                      image="/img/test-poster.png"
                      title="현대무용 <시차적 관점>"
                      start_at="2023.01.15 (목) 오전 10:00"
                      price="무료"
                      visitor_count={100}
                      space="서울예술대학교 빨간대문"
                    >
                      test
                    </Cardboard>
                  </CardboardList>
                  <CardboardList>
                    <Cardboard
                      image="/img/test-poster.png"
                      title="현대무용 <시차적 관점>"
                      start_at="2023.01.15 (목) 오전 10:00"
                      price="무료"
                      visitor_count={100}
                      space="서울예술대학교 빨간대문"
                    >
                      test
                    </Cardboard>
                  </CardboardList>
                </ul>
              </History>
            </SpacerSkleton>
          </SpacerSkleton>
        </SpacerSkleton>
      </SpacerSkleton>
    </AuthUserInfo.Provider>
  );
}

const Headline = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const History = styled.div``;

const CardboardList = styled.li`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      padding: 24px 0;
      border-bottom: 1px solid ${colors.secondary[200]};
    `;
  }}
`;

export default MyInfoPage;
