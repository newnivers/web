import type { ReactNode, CSSProperties } from "react";
import styled, { css } from "styled-components";
import type { ThemeColors } from "@/styles/theme/colors";

type FormTemplateStyle = Pick<CSSProperties, "width" | "height">;

interface Props {
  style: FormTemplateStyle;
  disabled: boolean;
  error: boolean;
  children: ReactNode;
}

export function DefaultFieldTemplate({
  style = { width: "100%", height: "100%" },
  disabled = false,
  error = false,
  children,
}: Partial<Props>) {
  return (
    <Container
      id="default-template"
      style={style}
      disabled={disabled}
      error={error}
    >
      {children}
    </Container>
  );
}

const Container = styled.div<Omit<Props, "children">>`
  ${({ style: { width, height }, disabled, error, theme }) => {
    const { colors } = theme;
    const borderColor = getBorderColor(colors, disabled, error);
    const backgroundColor = getBackgroundColor(colors, disabled);

    return css`
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
    `;
  }}
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
