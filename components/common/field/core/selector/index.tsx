import { useState } from "react";
import type { MouseEvent } from "react";
import { useController } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import styled, { css } from "styled-components";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface Props extends UseControllerProps {
  selectOptions?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

const getSelectedLabel = (selectOptions: SelectOption[], value: string) => {
  if (selectOptions.length === 0) {
    return "";
  }

  const option = selectOptions.find((option) => option.value === value);

  if (!option?.label) {
    return "";
  }

  return option.label;
};

export function Selector({
  selectOptions = [],
  placeholder = "",
  disabled = false,
  ...controllerProps
}: Props) {
  const { field } = useController(controllerProps);

  const [label, setLabel] = useState(
    getSelectedLabel(selectOptions, field.value)
  );
  const [isShowSelectOptions, setShowSelectOptions] = useState(false);

  const onClickSelector = () => {
    setShowSelectOptions((prev) => !prev);
  };

  const onClickOption = (e: MouseEvent<HTMLUListElement>) => {
    const { target } = e;

    if (!(target instanceof HTMLElement)) {
      return;
    }
    const { value } = target.dataset;

    if (!value) {
      return;
    }

    setLabel(getSelectedLabel(selectOptions, value));
    setShowSelectOptions((prev) => !prev);

    field.onChange(value);
  };

  return (
    <>
      <SelectInput
        type="button"
        className="reset icon"
        value={label}
        onClick={onClickSelector}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isShowSelectOptions && (
        <SelectOptions>
          <OptionsList onClick={onClickOption}>
            {selectOptions.map(({ value, label }, idx) => (
              <Option key={`${value}-${idx}`} data-value={value}>
                <p data-value={value}>{label}</p>
              </Option>
            ))}
          </OptionsList>
        </SelectOptions>
      )}
    </>
  );
}

const SelectInput = styled.input`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      text-align: left;
      cursor: pointer;

      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.secondary[500]};

      &:focus {
        font-weight: 600;
        color: ${colors.secondary.black};
      }
    `;
  }}
`;

const SelectOptions = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      position: absolute;
      z-index: 9999;
      left: 0;
      top: 48px;
      width: inherit;
      height: fit-content;
      border: 1px solid ${colors.secondary[200]};
      border-radius: 12px;
    `;
  }}
`;

const OptionsList = styled.ul`
  cursor: pointer;
`;

const Option = styled.li`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      padding: 8px 12px;
      text-align: left;
      background-color: ${colors.secondary.white};

      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.secondary[900]};

      &:hover {
        background-color: ${colors.secondary[200]};
      }

      &:first-child {
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      }

      &:last-child {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.secondary[200]};
      }
    `;
  }}
`;
