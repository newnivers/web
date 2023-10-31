"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import DefaultButton from "@/components/common/button";
import { DotColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import HiddenFileInput from "@/components/common/hiddenFileInput";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Text, { TextTags } from "@/components/common/text";
import DuplicateUserChecker from "@/components/domains/myInfo/duplicateUserChecker";
import { useFileUpload } from "@/hooks";
import { LocalStorage } from "@/utils/cache";

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;
const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

const queryClient = new QueryClient();

function MyInfoPage() {
  const authUser = JSON.parse(localStorage.get(authUserKey) ?? "");

  const { data } = useQuery(
    ["user", authUser?.userId],
    async () => {
      const { data } = await axios.get(
        `${defaultDomain}/api/users/${authUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHBpcmVkIjoiMjAyMy0xMC0xNCAxMDoyMzozMiIsImlhdCI6MTY5NjAzNzAxMi41MDczOX0.OYBciE-G7-KBr55BeFZdTKj1k-AJus8tsZDGvyNCA_U`,
          },
        }
      );

      return data;
    },
    {
      enabled: !!authUser?.userId,
    }
  );

  const { mutate } = useMutation(
    async (form: { nickname: string; profileImage: string }) => {
      const { data } = await axios.put(
        `${defaultDomain}/api/users/${authUser?.userId}`,
        form,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHBpcmVkIjoiMjAyMy0xMC0xNCAxMDoyMzozMiIsImlhdCI6MTY5NjAzNzAxMi41MDczOX0.OYBciE-G7-KBr55BeFZdTKj1k-AJus8tsZDGvyNCA_U`,
          },
        }
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user", authUser?.userId]);
      },
    }
  );

  const { register, handleSubmit, resetField, watch } = useForm({
    defaultValues: { nickname: data?.nickname },
  });

  const { fileInfo, onChangeFile, fileUpload } = useFileUpload(
    data?.profileImage
  );

  const [isEditing, setEditing] = useState(false);
  const nickname = watch("nickname");

  const onClickEditToggle = () => {
    if (isEditing) {
      resetField("nickname");
    }
    setEditing(!isEditing);
  };

  const onSubmitMyInfo = async (data: { nickname: string }) => {
    if (!fileInfo) {
      return;
    }

    try {
      const result = await fileUpload(fileInfo);

      const form = {
        nickname: data.nickname,
        profileImage: result?.Location || "",
      };

      mutate(form);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setEditing(false);
    }
  };

  return (
    <Container
      id="main-content"
      type="vertical"
      justify="center"
      align="center"
    >
      <form onSubmit={handleSubmit(onSubmitMyInfo)} style={{ width: "100%" }}>
        <Headline justify="center">
          <Title as={TextTags.h1}>MY Page</Title>
        </Headline>
        <Spacer
          justify="center"
          align="center"
          gap={30}
          restStyle={{
            width: "100%",
            margin: "30px 0",
          }}
        >
          <HiddenFileInput
            thumbnailStyle={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
            }}
            onChangeFile={onChangeFile}
          >
            <Image
              src={(fileInfo.data as string) || "/img/thumbnail-default.png"}
              fill={true}
              objectFit="contain"
              alt="thumbnail-default"
            />
          </HiddenFileInput>
          <SpacerSkleton gap={14}>
            <DotColumn tag="닉네임">
              <Field>
                <Field.Input
                  path="nickname"
                  register={register}
                  registerOptions={{ required: true }}
                  value={nickname}
                  disabled={!isEditing}
                />
              </Field>
            </DotColumn>
            <DuplicateUserChecker
              isEditing={isEditing}
              nickname={nickname}
              path="nickname"
              resetField={resetField}
            />
          </SpacerSkleton>
        </Spacer>
        <SpacerSkleton gap={isEditing ? 10 : 0} justify="center">
          {isEditing ? (
            <>
              <DefaultButton
                type="button"
                sort="secondary"
                onClick={onClickEditToggle}
              >
                취소
              </DefaultButton>
              <DefaultButton
                type="submit"
                disabled={data.nickname === nickname}
              >
                확인
              </DefaultButton>
            </>
          ) : (
            <DefaultButton
              type="button"
              sort="secondary"
              onClick={onClickEditToggle}
            >
              수정
            </DefaultButton>
          )}
        </SpacerSkleton>
      </form>
      <UserActiveInfoWrapper type="vertical" align="left" gap={30}>
        <SpacerSkleton>
          <DotColumn tag="구매 내역">
            <Field>
              <Field.Dropdown
                options={[
                  { id: "1", name: "test" },
                  { id: "2", name: "test" },
                  { id: "3", name: "test" },
                ]}
                placeholder="구매 내역 확인"
              />
            </Field>
          </DotColumn>
        </SpacerSkleton>
        <SpacerSkleton>
          <DotColumn tag="나의 후기">
            {/* <Field>
                <Field.Dropdown
                  options={data.reviewList}
                  placeholder="나의 후기 확인"
                />
              </Field> */}
          </DotColumn>
        </SpacerSkleton>
      </UserActiveInfoWrapper>
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  width: 600px;
`;

const Headline = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 474px;
      border-bottom: 1px solid ${colors.secondary_03};
      /* font-size: 3rem; */
      font-size: 2.5rem;
      color: ${colors.primary_02};
    `;
  }}
`;

const Title = styled(Text)`
  font-weight: 700;
`;

const UserActiveInfoWrapper = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 474px;
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid ${colors.secondary_03};
      color: ${colors.primary_02};
    `;
  }}
`;

export default MyInfoPage;
