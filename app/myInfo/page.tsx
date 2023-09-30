"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import DefaultButton from "@/components/common/button";
import { DotColumn } from "@/components/common/column";
import { Field } from "@/components/common/field";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Text, { TextTags } from "@/components/common/text";
import DuplicateUserChecker from "@/components/domains/myInfo/duplicateUserChecker";
import { AuthUserInfo } from "@/contexts";
import { LocalStorage } from "@/utils/cache";

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;
const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

function MyInfoPage() {
  const authUser = localStorage.get(authUserKey);

  const { data } = useQuery(
    ["user", authUser?.userId],
    async () => {
      const { data } = await axios.get(
        `${defaultDomain}/api/users/${authUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        }
      );

      return data;
    },
    {
      initialData: {
        id: 2,
        nickname: "병혀니",
        profileimage: "",
        purchaseList: [],
        reviewList: [],
      },
      enabled: !!authUser?.userId,
    }
  );

  const { getValues, register, handleSubmit, formState, resetField, watch } =
    useForm({ defaultValues: { nickname: data.nickname } });

  const [isEditing, setEditing] = useState(false);
  const nickname = watch("nickname");

  const onClickEditToggle = () => {
    if (isEditing) {
      resetField("nickname");
    }
    setEditing(!isEditing);
  };
  console.log(nickname);

  return (
    <AuthUserInfo.Provider>
      <Container
        id="main-content"
        type="vertical"
        justify="center"
        align="center"
      >
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          style={{ width: "100%" }}
        >
          <Headline justify="center">
            <Title as={TextTags.h1}>MY Page</Title>
          </Headline>
          <Spacer
            align="center"
            gap={30}
            restStyle={{
              width: "100%",
              margin: "30px 0",
            }}
          >
            <Image
              src="/img/thumbnail-default.png"
              width={130}
              height={130}
              alt="thumbnail-default"
            />
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
      </Container>
    </AuthUserInfo.Provider>
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

export default MyInfoPage;
