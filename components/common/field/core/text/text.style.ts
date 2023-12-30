import styled, { css } from "styled-components";

export const TextField = styled.input<{ disabled?: boolean }>`
  ${({ disabled = false, theme }) => {
    const { colors } = theme;

    return css`
      font-size: 16px;
      color: ${disabled ? colors.secondary[400] : colors.secondary[500]};

      &::placeholder {
        color: ${colors.secondary[400]};
      }
    `;
  }}
`;
