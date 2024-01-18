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
      background-color: ${colors.secondary["900"]};
      border: 1px solid ${colors.secondary["900"]};
      border-radius: 0.25rem;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 150%;

      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;

      &:disabled {
        cursor: not-allowed;
      }
    `;
  }}
`;

const ButtonText = styled(Text)<{ sort: ButtonSort }>`
  ${({ theme, sort }) => {
    const { colors } = theme;

    return css`
      ${theme.typoToken.subhead02}
      letter-spacing: 0.5px;
      color: ${sort === "primary" ? colors.white : colors.primary_01};
    `;
  }}
`;

export default DefaultButton;
