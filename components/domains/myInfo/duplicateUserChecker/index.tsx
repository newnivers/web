import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Path, UseFormResetField, FieldValues } from "react-hook-form";
import styled, { css } from "styled-components";
import Text from "@/components/common/text";
import { LocalStorage } from "@/utils/cache";

interface Props<T extends FieldValues> {
  isEditing: boolean;
  nickname: string;
  path: Path<T>;
  resetField: UseFormResetField<T>;
}

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;
const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

function DuplicateUserChecker<T extends FieldValues>({
  isEditing,
  nickname,
  path,
  resetField,
}: Props<T>) {
  const { refetch } = useQuery(
    ["check", "nickname"],
    async () => {
      const authUser = localStorage.get(authUserKey) as {
        token: string;
        user_id: string;
        nickname: string;
      };

      const { data } = await axios.get(
        `${defaultDomain}/api/users/check-nickname`,
        {
          params: { nickname },
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      return data;
    },
    {
      enabled: false,
      onSuccess: (data: { is_duplicated: boolean }) => {
        if (data.is_duplicated) {
          resetField(path);
        }
      },
    }
  );

  const onClickUserDuplcateCheck = () => {
    if (!nickname) {
      return;
    }

    refetch();
  };

  if (!isEditing) {
    return;
  }

  return (
    <DuplicateUserCheckButton onClick={onClickUserDuplcateCheck}>
      <CheckerText>중복확인</CheckerText>
    </DuplicateUserCheckButton>
  );
}

const DuplicateUserCheckButton = styled.button``;

const CheckerText = styled(Text)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-size: 10px;
      font-weight: 400;
      border-bottom: 1px solid ${colors.primary_02};
      color: ${colors.primary_02};
      cursor: pointer;
    `;
  }}
`;

export default DuplicateUserChecker;
