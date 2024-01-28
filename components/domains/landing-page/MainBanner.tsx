import styled, { css } from "styled-components";
import Typography from "@/components/common/text/Typography";

export function MainBanner({ title, date }: { title: string; date: string }) {
  return (
    <Background>
      <Overlay>
        <MainTitle>{title}</MainTitle>
        <MainPeriod typo="subhead03">{date}</MainPeriod>
        <SeeMoreButton>더보기</SeeMoreButton>
      </Overlay>
    </Background>
  );
}

const Background = styled.div`
  margin: 0 -10rem 120px -10rem;
  background-image: url("/img/landing-banner.png");
  height: 980px;
`;

const Overlay = styled.div`
  height: 980px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SeeMoreButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      border: 1px solid ${colors.secondary[400]};
      color: ${colors.secondary[400]};
      background: transparent;
      width: 148px;
      height: 56px;
      margin-top: 290px;
    `;
  }}
`;

const MainTitle = styled.div`
  color: white;
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: 64px;
  margin-top: 354px;
`;

const MainPeriod = styled(Typography)`
  color: #f9f9f9;
  margin-top: 12px;
`;
