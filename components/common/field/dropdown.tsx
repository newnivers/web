import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { commonFieldStyle } from "./shared";
import Spacer from "../spacer";

interface Props {
  options: { id: string; name: string }[];
  placeholder?: string;
  onClickOption?: (id: string) => void;
}

export function DropdownField({
  options = [],
  placeholder,
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
      <StyledDropdown>{placeholder}</StyledDropdown>
      <OptionList type="vertical" gap={10} isShowList={isShowList}>
        {options.map(({ id, name }) => (
          <li key={`${id}-${name}`} id={id}>
            {name}
          </li>
        ))}
      </OptionList>
      <DropdownIcon>
        <Image
          src={"/icon/arrow-down.svg"}
          width={12}
          height={12}
          alt="arrow-down"
        />
      </DropdownIcon>
    </Container>
  );
}

const Container = styled.div`
  width: inherit;
  height: inherit;
  cursor: pointer;
`;

const StyledDropdown = styled.div`
  ${commonFieldStyle};
`;

const OptionList = styled(Spacer)<{ isShowList: boolean }>`
  ${({ theme, isShowList }) => {
    const { colors } = theme;

    return css`
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      max-height: 130px;
      padding: 15px;
      text-align: left;
      border: 1px solid ${colors.secondary_03};
      background-color: ${colors.white};
      overflow-y: scroll;
      z-index: 9999;

      transform: ${isShowList ? "scaleY(1)" : "scaleY(0)"};
    `;
  }}
`;

const DropdownIcon = styled.div`
  position: absolute;
  top: 6.5px;
  right: 15px;
`;
