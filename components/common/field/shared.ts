import styled, { css } from "styled-components";

export const commonTemplateStyle = css`
  position: relative;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_03};
  border-radius: 30px;
  font-size: 0.85em;
`;

export const commonFieldStyle = css`
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: inherit;
  font-weight: 400;
  border: none;
  color: inherit;
  border: none;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.white} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.black_01};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  caret-color: ${({ theme }) => theme.colors.gray_03};
`;

export const resetSelectInputStyle = css`
  text-align: center;
  cursor: pointer;
  caret-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const ReadOnlyTemplate = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      ${commonTemplateStyle};

      background-color: ${colors.gray};
      border: none;
    `;
  }}
`;

export const ReadOnlyInput = styled.div`
  ${commonFieldStyle};

  text-align: left;
`;
