import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";
import TicketSearchBar from "@/components/domains/search";

export default function NavBar() {
  return (
    <Container>
      <NavMenu>
        <Logo />
        <MenuButton>ART</MenuButton>
        <MenuButton>Ticket</MenuButton>
      </NavMenu>
      <UserMenu>
        <TicketSearchBar />
        <MenuButton>LOGIN</MenuButton>
        <MenuButton>작품등록</MenuButton>
        <MenuButton>등록확인</MenuButton>
      </UserMenu>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  width: 5.5rem;
  height: 3rem;
  background-image: url("/icon/plavnewniverse_black_logo.svg");
  margin-right: 1rem;
`;
const MenuButton = styled(Typography)`
  ${({ theme }) => {
    const { typoToken } = theme;

    return css`
      ${typoToken.subhead03}
      margin-left: 1.5rem;
    `;
  }}
`;
const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;
