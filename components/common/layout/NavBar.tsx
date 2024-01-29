import { useContext } from "react";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";
import TicketSearchBar from "@/components/domains/search";
import { AuthUserInfo } from "@/contexts";

export default function NavBar() {
  const router = useRouter();
  const { authUser } = useContext(AuthUserInfo.Context);

  return (
    <Container>
      <NavMenu>
        <Logo onClick={() => router.push("/")} />
        <MenuButton>ART</MenuButton>
        <MenuButton onClick={() => router.push("/ticket")}>Ticket</MenuButton>
      </NavMenu>
      <UserMenu>
        {/* <TicketSearchBar /> */}
        {/* TODO: 로그아웃 기능 확인하기 */}
        {authUser !== null && authUser.id ? (
          <MenuButton onClick={() => router.push("/login")}>LOGIN</MenuButton>
        ) : (
          <MenuButton>LOGOUT</MenuButton>
        )}
        <MenuButton>작품등록</MenuButton>
        <MenuButton>등록확인</MenuButton>
      </UserMenu>
    </Container>
  );
}

const Container = styled.div`
  min-width: 1400px;
  padding: 0.75rem 10rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.white};
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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
      cursor: pointer;
      margin-left: 1.5rem;
    `;
  }}
`;
const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;
