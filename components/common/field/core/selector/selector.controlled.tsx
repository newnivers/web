import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { useController } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import * as Style from "./selector.style";

interface SelectOption {
  value: string | number;
  label: string;
}

interface Props extends UseControllerProps {
  selectOptions?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

const getSelectedLabel = (
  selectOptions: SelectOption[],
  placeholder: string,
  value: string
) => {
  if (!value) {
    return placeholder;
  }

  if (selectOptions.length === 0) {
    return placeholder;
  }

  const option = selectOptions.find((option) => option.value === value);

  if (!option?.label) {
    return placeholder;
  }

  return option.label;
};

export function ControlledSelector({
  selectOptions = [],
  placeholder = "",
  disabled = false,
  ...controllerProps
}: Props) {
  const { field } = useController(controllerProps);

  const selectorRef = useRef<HTMLInputElement | null>(null);

  const [label, setLabel] = useState(
    getSelectedLabel(selectOptions, placeholder, field.value)
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

    setLabel(getSelectedLabel(selectOptions, placeholder, value));
    setShowSelectOptions((prev) => !prev);

    field.onChange(value);
  };

  useEffect(() => {
    if (selectorRef.current && isShowSelectOptions) {
      document.addEventListener("click", onClickSelector);
    }

    return () => {
      if (!isShowSelectOptions) {
        return;
      }

      document.removeEventListener("click", onClickSelector);
    };
  }, [isShowSelectOptions]);

  return (
    <>
      <Style.SelectInput
        ref={selectorRef}
        type="button"
        className="reset icon"
        value={label}
        onClick={onClickSelector}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isShowSelectOptions && (
        <Style.SelectOptions>
          <Style.OptionsList onClick={onClickOption}>
            {selectOptions.map(({ value, label }, idx) => (
              <Style.Option key={`${value}-${idx}`} data-value={value}>
                <p data-value={value}>{label}</p>
              </Style.Option>
            ))}
          </Style.OptionsList>
        </Style.SelectOptions>
      )}
    </>
  );
}
