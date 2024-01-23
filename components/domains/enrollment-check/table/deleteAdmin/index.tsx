import styled, { css } from "styled-components";

export function DeleteAdmin() {
  return <DeleteButton>삭제하기</DeleteButton>;
}

const DeleteButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 5px 0;
      border: 1px solid ${colors.secondary[400]};
      border-radius: 4px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
