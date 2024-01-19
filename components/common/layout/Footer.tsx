import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";

export default function Footer() {
  return (
    <Container>
      <HorizontalWrapper>
        <IntroWrapper>
          <LogoIcon />
          <IntroText>
            “당신의 예술이 순간으로 끝나지 않도록” 젊은 예술가들을 위한 하나의
            예술작품 <br />
            유통 플랫폼 PLAY NEWNIVERSE
          </IntroText>
          <IntroText>
            플레이뉴니버스는 서울예술대학교에서 창작된 작품의 작품성을 보존하고
            유통을
            <br /> 위해 마련되었습니다.
          </IntroText>
        </IntroWrapper>
        <MenuWrapper>
          <MenuHeader>CONTACT US</MenuHeader>
          <MenuButton>플뉴소개</MenuButton>
          <MenuButton>고객센터</MenuButton>
          <MenuButton>Contact</MenuButton>
          <MenuButton>작품검수</MenuButton>
        </MenuWrapper>
        <MenuWrapper>
          <MenuHeader>FOLLOW US</MenuHeader>
          <SnsText typo="body03">
            SNS를 통해 플레이뉴니버스의 소식을 빠르게 확인하세요!
          </SnsText>
          <HorizontalWrapper>
            <InstagramIcon />
            <YoutubeIcon />
          </HorizontalWrapper>
        </MenuWrapper>
      </HorizontalWrapper>
      <BottomText>Play NEWniverse @ 2023. All rights reserved.</BottomText>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary["900"]};
  height: 335px;
  padding: 3rem 10rem 1.5rem 10rem;
`;

const HorizontalWrapper = styled.div`
  display: flex;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 155px;
`;

const BottomText = styled(Typography)``;

const LogoIcon = styled.div`
  width: 5.5rem;
  height: 3rem;
  background-image: url("/icon/plavnewniverse_white_logo.svg");
  margin-bottom: 2.13rem;
`;

const YoutubeIcon = styled.div`
  background-image: url("/icon/youtube_logo.svg");
  width: 2.75rem;
  height: 2.75rem;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.colors.secondary.black};
  background-position: center;
  border-radius: 50%;
`;

const InstagramIcon = styled.div`
  background-image: url("/icon/instagram_logo.svg");
  width: 2.75rem;
  height: 2.75rem;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.colors.secondary.black};
  background-position: center;
  border-radius: 50%;
  margin-right: 1rem;
`;

const IntroText = styled(Typography)`
  ${({ theme }) => {
    const { colors, typoToken } = theme;

    return css`
      ${typoToken.body03}
      color: ${colors.secondary[500]};
      width: 23.15rem;
      white-space: nowrap;
      margin-bottom: 0.75rem;
    `;
  }}
`;

const SnsText = styled(Typography)`
  ${({ theme }) => {
    const { colors, typoToken } = theme;

    return css`
      ${typoToken.body03}
      color: ${colors.secondary[400]};
      width: 13.25rem;
      margin-bottom: 0.88rem;
    `;
  }}
`;

const MenuHeader = styled(Typography)`
  ${({ theme }) => {
    const { colors, typoToken } = theme;

    return css`
      ${typoToken.subhead03}
      color: ${colors.secondary[100]};
      margin-bottom: 0.75rem;
    `;
  }}
`;

const MenuButton = styled(Typography)`
  ${({ theme }) => {
    const { colors, typoToken } = theme;

    return css`
      ${typoToken.body02}
      color: ${colors.secondary[200]};
      margin-bottom: 0.5rem;
    `;
  }}
`;
