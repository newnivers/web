import styled, { css } from "styled-components";

export default function TicketSearchBar() {
  return (
    <Wrapper>
      <SearchIcon htmlFor="ticket-search" />
      <SearchInput
        id="ticket-search"
        type="text"
        placeholder="검색어를 입력해주세요."
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid ${colors.secondary[500]};
      width: 13.8rem;
      height: 1.5rem;
      box-sizing: content-box;
      display: flex;
      align-items: center;
    `;
  }}
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  &::placeholder {
    ${({ theme }) => theme.typoToken.body02}
    colors: ${({ theme }) => theme.colors.secondary[400]}
  }
`;
const SearchIcon = styled.label`
  background-image: url("/icon/search.svg");
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
`;
