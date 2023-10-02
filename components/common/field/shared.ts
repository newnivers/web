import styled, { css } from "styled-components";

export const commonTemplateStyle = css`
  position: relative;
  min-width: 264px;
  min-height: 27px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_03};
  border-radius: 30px;
`;

export const commonFieldStyle = css`
  display: block;
  width: 100%;
  height: 100%;
  font-size: 14px;
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
