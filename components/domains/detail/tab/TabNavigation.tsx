import type { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { DetailTabEnum } from "./type";

type TabNavigationProps = {
  currentTab: DetailTabEnum;
  setCurrentTab: Dispatch<SetStateAction<DetailTabEnum>>;
};

export default function TabNavigation({
  currentTab,
  setCurrentTab,
}: TabNavigationProps) {
  return (
    <Wrapper>
      <Tab
        selected={currentTab === DetailTabEnum.INFO}
        onClick={() => setCurrentTab(DetailTabEnum.INFO)}
      >
        상세정보
      </Tab>
      <Tab
        selected={currentTab === DetailTabEnum.REVIEW}
        onClick={() => setCurrentTab(DetailTabEnum.REVIEW)}
      >
        관람후기
      </Tab>
      <Tab
        selected={currentTab === DetailTabEnum.LOCATION}
        onClick={() => setCurrentTab(DetailTabEnum.LOCATION)}
      >
        장소정보
      </Tab>
      <Tab
        selected={currentTab === DetailTabEnum.CANCEL_INFO}
        onClick={() => setCurrentTab(DetailTabEnum.CANCEL_INFO)}
      >
        예매/취소 안내
      </Tab>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid ${colors.secondary["200"]};
      display: flex;
      justify-content: center;
    `;
  }}
`;

const Tab = styled.span<{ selected: boolean }>`
  ${({ selected, theme }) => {
    const { colors } = theme;

    return css`
      padding-bottom: 0.6rem;
      width: 9rem;
      text-align: center;
      display: inline-block;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 150%;
      color: ${selected ? colors.secondary.black : colors.secondary[400]};
      border-bottom: ${selected
        ? `2px solid ${colors.secondary.black}`
        : "none"};
    `;
  }}
`;
