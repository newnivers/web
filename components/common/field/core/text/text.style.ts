import styled, { css } from "styled-components";

export const TextField = styled.input<{ disabled: boolean }>`
  ${({ disabled, theme }) => {
    const { colors } = theme;

    return css`
      color: ${disabled ? colors.secondary[400] : colors.secondary[500]};

      &::placeholder {
        color: ${colors.secondary[400]};
      }
    `;
  }}
`;
