import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";

interface Props {
  authUri: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function OAuthLoginButton({ authUri, children, style }: Props) {
  const onClickLogin = () => {
    window.location.assign(authUri);
  };

  return (
    <Button style={{ ...style }} onClick={onClickLogin}>
      <IconWrap>
        <Image
          src="/icon/icon-naver.png"
          width={30}
          height={30}
          alt="icon-naver"
        />
      </IconWrap>
      {children}
    </Button>
  );
}

const Button = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 3.125rem;
      padding: 0 3.125rem;
      gap: 0.5rem;
      border-radius: 0.375rem;
      color: ${colors.white};
      cursor: pointer;
    `;
  }}
`;

const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
`;
