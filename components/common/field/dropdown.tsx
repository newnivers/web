import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { commonFieldStyle, resetSelectInputStyle } from "./shared";
import Spacer from "../spacer";

interface Props {
  options: { id: string | number; name: string }[];
  placeholder?: string;
  isShowIcon?: boolean;
  onClickOption?: (id: string) => void;
}

export function DropdownField({
  options = [],
  placeholder,
  isShowIcon = true,
  onClickOption,
}: Props) {
  const [isShowList, setShowList] = useState(false);

  const onShowableChange = (e: MouseEvent<HTMLDivElement>) => {
    const selectedId = e.currentTarget.id;

    setShowList((prev) => !prev);

    if (onClickOption) {
      onClickOption(selectedId);
    }
  };

  return (
    <Container onClick={onShowableChange}>
      <StyledDropdown placeholder={placeholder} />
      <OptionList type="vertical" isShowList={isShowList}>
        {options.map(({ id, name }) => (
          <Option key={`${id}-${name}`} id={`${id}`}>
            {name}
          </Option>
        ))}
      </OptionList>
      {isShowIcon && (
        <DropdownIcon>
          <Image
            src={"/icon/arrow-down.svg"}
            width={12}
            height={12}
            alt="arrow-down"
          />
        </DropdownIcon>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: inherit;
  height: inherit;
  cursor: pointer;
`;

const StyledDropdown = styled.input`
  ${commonFieldStyle};
  ${resetSelectInputStyle}
`;

const OptionList = styled(Spacer)<{ isShowList: boolean }>`
  ${({ theme, isShowList }) => {
    const { colors } = theme;

    return css`
      position: absolute;
      top: 35px;
      left: 0;
      width: 100%;
      max-height: 150px;
      text-align: center;
      border: 1px solid #aeaeae;
      border-radius: 0.3rem;
      background-color: ${colors.white};
      overflow-y: scroll;
      z-index: 9999;

      transform: ${isShowList ? "scaleY(1)" : "scaleY(0)"};
    `;
  }}
`;

const Option = styled.li`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      font-family: "Helvetica Neue", helvetica, arial, sans-serif;
      padding: 10px 15px;

      &:hover {
        background-color: ${colors.gray_01_1};
      }
    `;
  }};
`;

const DropdownIcon = styled.div`
  position: absolute;
  top: 6.5px;
  right: 9%;
`;
