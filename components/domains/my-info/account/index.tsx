import { useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import httpClient from "@/api/core";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { useAuthUserStorage, useFileUpload } from "@/hooks";

interface Props {
  id: number;
  nickname: string;
  profileImage: string;
}

export function Account({ id, nickname, profileImage }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { resetUserAuth } = useAuthUserStorage();

  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(
    profileImage
  );

  const { onChangeFile, fileUpload } = useFileUpload({
    onFileChangedSuccess(fileInfo) {
      setThumbnail(fileInfo.data);

      (async () => {
        const res = await fileUpload(fileInfo);

        await httpClient.patch(`/users/${id}`, {
          data: {
            nickname,
            profileImage: res?.Location,
          },
        });
      })();
    },
  });

  const onClickLogout = () => {
    resetUserAuth();
  };

  return (
    <Container align="center">
      <UserInfo>
        <SpacerSkleton align="center" gap={16}>
          <ThumbnailUploader>
            <Image
              src={thumbnail ? `${thumbnail}` : "/img/default-thumbnail.png"}
              layout="fill"
              alt="default-thumbnail"
            />
            <input
              type="file"
              style={{ visibility: "hidden" }}
              onChange={onChangeFile}
            />
          </ThumbnailUploader>
          <SpacerSkleton align="baseline" type="vertical" gap={12}>
            <Typography typo="subhead02">{`${nickname} 님`}</Typography>
            {/* <SpacerSkleton type="vertical" gap={4}>
              <SpacerSkleton gap={16}>
                <UserInfoTypo typo="subhead04">연동계정</UserInfoTypo>
                <UserInfoTypo typo="subhead04">
                  1234obama@naver.com
                </UserInfoTypo>
              </SpacerSkleton>
              <SpacerSkleton gap={16}>
                <UserInfoTypo typo="subhead04">전화번호</UserInfoTypo>
                <UserInfoTypo typo="subhead04">010-4107-2689</UserInfoTypo>
              </SpacerSkleton>
            </SpacerSkleton> */}
          </SpacerSkleton>
        </SpacerSkleton>
      </UserInfo>
      <SpacerSkleton
        justify="center"
        align="center"
        style={{ flex: "1", height: "100%", borderLeft: "1px solid #D4D4D4" }}
      >
        <LogoutButton onClick={onClickLogout}>
          <Image
            src="/icon/logout.svg"
            width={18}
            height={17.98}
            alt="logout"
          />
          <LogoutTypo typo="subhead02">로그아웃</LogoutTypo>
        </LogoutButton>
      </SpacerSkleton>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 100%;
      border-top: 1px solid ${colors.secondary[200]};
      border-bottom: 1px solid ${colors.secondary[200]};
    `;
  }}
`;

const UserInfo = styled.div`
  flex: 4;
  padding: 12px;
`;

const ThumbnailUploader = styled.label`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12.44px;
`;

const LogoutTypo = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;

const UserInfoTypo = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;
