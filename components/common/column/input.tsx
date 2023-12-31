import type { ReactNode, CSSProperties } from "react";
import styled, { css } from "styled-components";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import type { Props as SpacerProps } from "@/components/common/spacer";

type LabelPos = "top" | "left";

type OmitedSpacerProps = Omit<
  SpacerProps,
  "children" | "resetStyle" | "className" | "as"
>;

interface Props {
  id: string;
  name: string;
  labelPos?: LabelPos;
  unit?: string;
  spacer?: OmitedSpacerProps;
  inputStyle?: CSSProperties;
  children: ReactNode;
}

function InputColumn({
  id,
  name,
  labelPos = "left",
  unit,
  spacer,
  children,
}: Props) {
  const inputColumnStyle: OmitedSpacerProps =
    labelPos === "left"
      ? { type: "horizontal", align: "center", gap: 8 }
      : { type: "vertical", align: "baseline", gap: 8 };

  return (
    <Spacer {...{ ...inputColumnStyle, ...spacer }}>
      <InputLabel htmlFor={id}>
        <LabelText>{name}</LabelText>
      </InputLabel>
      <SpacerSkleton
        type="horizontal"
        align="center"
        gap={8}
        style={{ width: "100%" }}
      >
        {children}
        {unit && <UnitText>{unit}</UnitText>}
      </SpacerSkleton>
    </Spacer>
  );
}

const InputLabel = styled.label`
  text-align: left;
  min-width: 56px;
`;

const LabelText = styled.p`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.secondary.black};
    `;
  }}
`;

const UnitText = styled.p`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      color: ${colors.secondary[500]};
    `;
  }}
`;

export default InputColumn;
