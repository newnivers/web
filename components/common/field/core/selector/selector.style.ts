import styled, { css } from "styled-components";

export const SelectInput = styled.input`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      height: 100%;
      text-align: left;
      cursor: pointer;

      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.secondary[500]};

      &:focus {
        font-weight: 600;
        color: ${colors.secondary.black};
      }
    `;
  }}
`;

export const SelectOptions = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      position: absolute;
      z-index: 9999;
      left: 0;
      top: 48px;
      width: inherit;
      height: 200px;
      border: 1px solid ${colors.secondary[200]};
      border-radius: 12px;
      overflow-y: scroll;
    `;
  }}
`;

export const OptionsList = styled.ul`
  cursor: pointer;
`;

export const Option = styled.li`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      padding: 8px 12px;
      text-align: left;
      background-color: ${colors.secondary.white};

      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.secondary[900]};

      &:hover {
        background-color: ${colors.secondary[200]};
      }

      &:first-child {
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      }

      &:last-child {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.secondary[200]};
      }
    `;
  }}
`;
