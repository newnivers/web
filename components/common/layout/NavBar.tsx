import { useRouter, usePathname } from "next/navigation";
import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";
import { useAuthUserStorage } from "@/hooks";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cachedValue, setValue, resetValue] = useAuthUserStorage();

  const onClickLogout = () => {
    resetValue();

    if (pathname !== "/") {
      router.replace("/");
    }
  };

  return (
    <Container>
      <NavMenu>
        <Logo onClick={() => router.push("/")} />
        <MenuButton>ART</MenuButton>
        <MenuButton onClick={() => router.push("/ticket")}>Ticket</MenuButton>
      </NavMenu>
      <UserMenu>
        {!cachedValue?.id && !cachedValue?.token ? (
          <MenuButton onClick={() => router.push("/login")}>LOGIN</MenuButton>
        ) : (
          <MenuButton onClick={onClickLogout}>LOGOUT</MenuButton>
        )}
        <MenuButton onClick={() => router.push("/register-work")}>
          작품등록
        </MenuButton>
        <MenuButton onClick={() => router.push("/enrollment-check")}>
          등록확인
        </MenuButton>
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
