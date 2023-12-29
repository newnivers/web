import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";

interface Props {
  isShow: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  children: ReactNode;
}

export function DefaultModal({
  isShow,
  onClose,
  showCloseButton = true,
  children,
}: Props) {
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
    <Backdrop onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <SpacerSkleton justify="flex-end" style={{ padding: "8px 16px" }}>
            <button onClick={onClose}>
              <Image
                src="/icon/default-close.svg"
                width={24}
                height={24}
                alt="default-close"
              />
            </button>
          </SpacerSkleton>
        )}
        {children}
      </Content>
    </Backdrop>
  );
}

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

const Content = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      border-radius: 12px;
      background-color: ${colors.secondary.white};
      box-shadow: 0 5px 15px ${colors.secondary["black-30"]};
    `;
  }}
`;
