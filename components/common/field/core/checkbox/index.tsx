import type { ChangeEvent } from "react";
import { useController } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import styled, { css } from "styled-components";

type CheckboxStatus = "default" | "disabled";

interface Props extends UseControllerProps {
  status?: CheckboxStatus;
  isForceChcked?: boolean;
  labelName?: string;
}

export function Checkbox({
  status = "default",
  isForceChcked = false,
  labelName,
  ...controllerProps
}: Props) {
  const { field } = useController(controllerProps);

  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    field.onChange(checked);
  };

  return (
    <>
      <HiddenInput
        type="checkbox"
        id={field.name}
        name={field.name}
        defaultChecked={field.value || isForceChcked}
        disabled={status === "disabled"}
        onChange={onChangeChecked}
      />
      <CheckLabel htmlFor={field.name} status={status}>
        {labelName && <LabelText status={status}>{labelName}</LabelText>}
      </CheckLabel>
    </>
  );
}

const CheckLabel = styled.label<{ status: CheckboxStatus }>`
  ${({ status, theme }) => {
    const { colors } = theme;

    return css`
      position: relative;
      display: flex;
      align-items: center;
      user-select: none;
      width: fit-content;
      cursor: ${status === "default" ? "pointer" : "not-allowed"};

      &:before {
        content: "";
        width: 24px;
        height: 24px;
        background-color: ${status === "default"
          ? colors.secondary.white
          : colors.secondary[150]};
        border: 1px solid ${colors.secondary[400]};
      }

      &:after {
        content: "";
        opacity: 0;
        position: absolute;
        height: 24px;
        width: 24px;
        border: 1px solid transparent;
        background-image: url("/icon/checkbox-checked.svg");
        background-size: 16.3px 12.03px;
        background-position: 50% 40%;
        background-repeat: no-repeat;
        background-color: ${colors.secondary[900]};
      }
    `;
  }}
`;

const HiddenInput = styled.input`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      position: absolute;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      height: 0;

      &:checked + ${CheckLabel}::after {
        opacity: 1;
      }

      &:focus-visible + ${CheckLabel}::before {
        outline: 1px solid ${colors.secondary[900]};
      }
    `;
  }}
`;

const LabelText = styled.p<{ status: CheckboxStatus }>`
  ${({ status, theme }) => {
    const { colors } = theme;

    return css`
      margin-left: 12px;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${status === "default"
        ? colors.secondary[500]
        : colors.secondary[400]};
    `;
  }}
`;
