import type { ReactNode, CSSProperties } from "react";
import styled, { css } from "styled-components";
import type { ThemeColors } from "@/styles/theme/colors";

type FormTemplateStyle = Pick<CSSProperties, "width" | "height">;

interface Props {
  style?: FormTemplateStyle;
  disabled?: boolean;
  error?: boolean;
  children?: ReactNode;
}

export function FieldTemplate({
  style = { width: "100%", height: "100%" },
  disabled = false,
  error = false,
  children,
}: Props) {
  return (
    <Container style={style} disabled={disabled} error={error}>
      {children}
    </Container>
  );
}

const Container = styled.div<{
  style: FormTemplateStyle;
  disabled: boolean;
  error: boolean;
}>`
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
