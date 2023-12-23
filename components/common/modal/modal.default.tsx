import { useEffect, type ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props {
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DefaultModal({ isShow, onClose, children }: Props) {
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
      <Content>{children}</Content>
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
      padding: 28px;
      border-radius: 12px;
      background-color: ${colors.secondary.white};
      box-shadow: 0 5px 15px ${colors.secondary["black-30"]};
    `;
  }}
`;
