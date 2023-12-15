import type { ReactNode, CSSProperties } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import type { ThemeColors } from "@/styles/theme/colors";

type FormTemplateStyle = Pick<CSSProperties, "width" | "height">;

type IconType = "dropdown" | "calendar" | "default";

interface Props {
  style: FormTemplateStyle;
  disabled: boolean;
  error: boolean;
  iconType: IconType;
  children: ReactNode;
}

export function DefaultFieldTemplate({
  style = { width: "100%", height: "100%" },
  disabled = false,
  error = false,
  iconType = "default",
  children,
}: Partial<Props>) {
  const isShowCalendar = iconType === "calendar";
  const isShowArrowDownIcon =
    iconType === "dropdown" || iconType === "calendar";

  return (
    <Container
      id="default-field-template"
      style={style}
      disabled={disabled}
      error={error}
      iconType={iconType}
    >
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

const Container = styled.div<Omit<Props, "children">>`
  ${({ style: { width, height }, disabled, error, iconType, theme }) => {
    const { colors } = theme;
    const borderColor = getBorderColor(colors, disabled, error);
    const backgroundColor = getBackgroundColor(colors, disabled);

    return css`
      position: relative;
      min-width: 138px;
      min-height: 40px;
      width: ${typeof width === "string" ? width : `${width}px`};
      height: ${typeof height === "string" ? width : `${width}px`};
      padding: 8px 12px;
      border: 1px solid ${borderColor};
      border-radius: 12px;
      background-color: ${backgroundColor};

      &:has(input:focus) {
        border: 1px solid ${colors.secondary[500]};
      }

      & > input.reset {
        width: 100%;
        margin: 0;
        padding: 0;
        border: none;
        line-height: normal;
        color: inherit;
        background-color: transparent;
        box-shadow: none;
        outline: none;

        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      & > input.reset.icon {
        width: ${calcIconInputWidth(iconType)};
      }
    `;
  }}
`;

const Icon = styled.div<{ pos: "left" | "right" }>`
  position: absolute;
  top: 20%;
  ${({ pos }) => (pos === "left" ? "left: 12px" : "right: 12px")}
`;

const getBorderColor = (
  colors: ThemeColors,
  disabled: boolean,
  error: boolean
) => {
  if (disabled) {
    return colors.secondary[400];
  }
  if (error) {
    return colors.system.red;
  }

  return colors.secondary[400];
};

const getBackgroundColor = (colors: ThemeColors, disabled: boolean) => {
  if (disabled) {
    return colors.secondary[150];
  }

  return colors.secondary.white;
};

const calcIconInputWidth = (iconType: IconType) => {
  if (iconType === "dropdown") {
    return "calc(100% - 24px);";
  }
  if (iconType === "calendar") {
    return "calc(100% - 48px);";
  }
};
