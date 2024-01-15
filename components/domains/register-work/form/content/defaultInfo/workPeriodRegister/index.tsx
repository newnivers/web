import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { DefaultModal } from "@/components/common/modal";
import { SpacerSkleton } from "@/components/common/spacer";

interface Props {
  children: (onClickModalShow: () => void) => ReactNode;
}

export function WorkPeriodRegister({ children }: Props) {
  const [isShow, setShow] = useState(false);

  const onClickModalShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      <DefaultModal isShow={isShow} onClose={onClickModalShow}>
        {children(onClickModalShow)}
      </DefaultModal>
      <RegisterButton type="button" onClick={onClickModalShow}>
        <SpacerSkleton align="center" gap={6}>
          <Image
            src="/icon/register-plus.svg"
            width={24}
            height={24}
            alt="register-plus"
          />
          <RegisterText>클릭하여 작품 기간을 등록해주세요.</RegisterText>
        </SpacerSkleton>
      </RegisterButton>
    </>
  );
}

const RegisterButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 52px 0;
      border-radius: 12px;
      background-color: ${colors.secondary[100]};
    `;
  }}
`;

const RegisterText = styled.p`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-size: 24px;
      font-weight: 600;
      line-height: 36px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
