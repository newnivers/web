import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import Button from "@/components/common/button";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface ConfirmModalProps {
  isShow: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

export function ConfirmModal({
  isShow,
  onClose,
  onConfirm,
  title,
  children,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <Backdrop>
      <Content onClick={(e) => e.stopPropagation()}>
        <SpacerSkleton justify="flex-end">
          <button onClick={onClose}>
            <Image
              src="/icon/default-close.svg"
              width={24}
              height={24}
              alt="default-close"
            />
          </button>
        </SpacerSkleton>
        <ModalTitle typo="subhead02">{title}</ModalTitle>
        <Typography typo="body03">{children}</Typography>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </Content>
    </Backdrop>
  );
}

const ModalTitle = styled(Typography)`
  margin-top: 0.5rem;
  margin-bottom: 1.4rem;
`;

const Backdrop = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      z-index: 9999;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: ${colors.secondary["black-50"]};
    `;
  }}
`;

const ConfirmButton = styled(Button)`
  margin-top: 2rem;
`;

const Content = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      flex-direction: column;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      background-color: ${colors.secondary.white};
      box-shadow: 0 5px 15px ${colors.secondary["black-30"]};
      text-align: center;
    `;
  }}
`;
