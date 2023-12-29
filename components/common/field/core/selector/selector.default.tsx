import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import * as Style from "./selector.style";

interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  defaultValue?: string | number;
  selectOptions: SelectOption[];
  onSelect: (e: MouseEvent<HTMLUListElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const getSelectedLabel = (
  selectOptions: SelectOption[],
  value?: string | number
) => {
  if (!value) {
    return "";
  }

  if (selectOptions.length === 0) {
    return "";
  }

  const option = selectOptions.find((option) => option.value === value);

  if (!option?.label) {
    return "";
  }

  return option.label;
};

export function DefaultSelector({
  defaultValue,
  selectOptions,
  onSelect,
  placeholder = "",
  disabled = false,
}: Props) {
  const selectorRef = useRef<HTMLInputElement | null>(null);

  const [label, setLabel] = useState(
    getSelectedLabel(selectOptions, defaultValue)
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

    onSelect(e);
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
