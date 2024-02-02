"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";
import httpClient from "@/api/core";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import {
  Account,
  Cardboard,
  ReviewCardboard,
  reviewList,
  purchaseList,
} from "@/components/domains/my-info";
import { AuthUserInfo } from "@/contexts";
import { useAuthUserStorage } from "@/hooks";

interface MyInfo {
  id: number;
  nickname: string;
  profileImage: string;
  purchaseList: [];
  reviewList: [];
}

function MyInfoPage() {
  const searchParams = useSearchParams();
  const { userAuth } = useAuthUserStorage();
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [content, setContent] = useState(searchParams.get("content") || "work");

  useEffect(() => {
    if (!userAuth.id) {
      return;
    }

    (async () => {
      const res = await httpClient.get<{
        message: string;
        data: {
          id: number;
          nickname: string;
          profileImage: string;
          purchaseList: [];
          reviewList: [];
        };
      }>(`/users/${userAuth.id}`);

      setMyInfo(res.data);
    })();
  }, [userAuth]);

  if (!myInfo) {
    return;
  }

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
              onClick={() => setContent("work")}
            >
              <Typography typo="subhead02">예약/신청 내역</Typography>
            </Link>
            <Link
              href={{
                pathname: "/my-info",
                query: { content: "review" },
              }}
              onClick={() => setContent("review")}
            >
              <Typography typo="subhead02">나의 후기</Typography>
            </Link>
          </SpacerSkleton>
          <SpacerSkleton type="vertical" gap={24} style={{ flex: 2 }}>
            <Account
              id={myInfo.id}
              nickname={myInfo.nickname}
              profileImage={myInfo.profileImage}
            />
            <SpacerSkleton type="vertical" gap={24}>
              <div>
                <h4>
                  <Typography typo="subhead01">
                    {content === "work" ? "예약/신청 내역" : "나의 후기"}
                  </Typography>
                </h4>
              </div>
              <History>
                <ul>
                  {content === "work"
                    ? purchaseList.map((value, idx) => (
                        <CardboardList key={`${value.title}-${idx}`}>
                          <Cardboard
                            image={value.image}
                            title={value.title}
                            start_at={value.start_at}
                            price={value.price}
                            visitor_count={value.vistor_cnt}
                            space={value.space}
                          >
                            test
                          </Cardboard>
                        </CardboardList>
                      ))
                    : reviewList.map((value) => (
                        <CardboardList key={value.title}>
                          <ReviewCardboard
                            image={value.image}
                            title={value.title}
                            start_at={value.start_at}
                            price={value.price}
                            visitor_count={value.vistor_cnt}
                            space={value.space}
                          >
                            test
                          </ReviewCardboard>
                        </CardboardList>
                      ))}
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

const History = styled.div`
  max-height: 600px;
  overflow: scroll;
`;

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
