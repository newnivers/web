"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { DotColumn } from "@/components/common/column";
import Field from "@/components/common/field";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Text, { TextTags } from "@/components/common/text";
import DuplicateUserChecker from "@/components/domains/myInfo/duplicateUserChecker";
import { AuthUserInfo } from "@/contexts";

function MyInfoPage() {
  const { getValues, register, handleSubmit, formState, resetField, watch } =
    useForm();

  const [isEditing, setEditing] = useState(false);
  const nickname = watch("nickname");

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
                  <Field.input
                    path="nickname"
                    register={register}
                    registerOptions={{ required: true }}
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
