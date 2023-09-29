import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
import Text from "../text";

type ButtonSort = "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  sort?: ButtonSort;
  children: ReactNode;
}

function DefaultButton({
  sort = "primary",
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <StyledButton sort={sort} onClick={onClick} {...rest}>
      <ButtonText sort={sort}>{children}</ButtonText>
    </StyledButton>
  );
}

const StyledButton = styled.button<{ sort: ButtonSort }>`
  ${({ theme, sort }) => {
    const { colors } = theme;

    return css`
      min-width: 130px;
      min-height: 45px;
      padding: 12px 20px;
      background-color: ${sort === "primary"
        ? colors.primary_01
        : colors.white};
      border: 1px solid ${colors.primary_01};
      border-radius: 30px;
    `;
  }}
`;

const ButtonText = styled(Text)<{ sort: ButtonSort }>`
  ${({ theme, sort }) => {
    const { colors } = theme;

    return css`
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0.5px;
      color: ${sort === "primary" ? colors.white : colors.primary_01};
    `;
  }}
`;

export default DefaultButton;
