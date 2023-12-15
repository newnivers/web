import type { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";

type IconType = "selector" | "calendar";

interface Props {
  iconType: IconType;
  children: ReactNode;
}

export function IconFieldTemplate({ iconType, children }: Props) {
  const isShowCalendar = iconType === "calendar";
  const isShowArrowDownIcon =
    iconType === "selector" || iconType === "calendar";

  return (
    <Container iconType={iconType}>
      {isShowCalendar && (
        <Icon pos="left">
          <Image
            src="/icon/selector-calendar.svg"
            width={18}
            height={20}
            alt="selector-calendar"
          />
        </Icon>
      )}
      {children}
      {isShowArrowDownIcon && (
        <Icon pos="right">
          <Image
            src="/icon/selector-arrow-down.svg"
            width={11.31}
            height={6.71}
            alt="selector-arrow-down"
          />
        </Icon>
      )}
    </Container>
  );
}

const Container = styled.div<Pick<Props, "iconType">>`
  position: relative;
  width: fit-content;
  height: fit-content;

  & > div#default-template > input.reset.icon {
    box-sizing: border-box;
    ${({ iconType }) => getIconInputWidthStyle(iconType)};
  }
`;

const Icon = styled.div<{ pos: "left" | "right" }>`
  position: absolute;
  top: 20%;
  ${({ pos }) => (pos === "left" ? "left: 12px" : "right: 12px")}
`;

const getIconInputWidthStyle = (iconType: IconType) => {
  if (iconType === "selector") {
    return "width: calc(100% - 24px);";
  }

  return "width: calc(100% - 48px);";
};
