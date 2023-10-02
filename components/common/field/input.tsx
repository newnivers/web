import type { InputHTMLAttributes } from "react";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
  UseFormResetField,
} from "react-hook-form";
import styled, { css } from "styled-components";
import { commonFieldStyle } from "./shared";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  path: Path<T>;
  register: UseFormRegister<T>;
  registerOptions: RegisterOptions;
  resetField?: UseFormResetField<T>;
  watchedValue?: string;
}

export function FieldInput<T extends FieldValues>({
  path,
  register,
  registerOptions,
  resetField,
  ...rest
}: Props<T>) {
  return (
    <StyledInput id={path} {...register(path, registerOptions)} {...rest} />
  );
}

const StyledInput = styled.input`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      ${commonFieldStyle};

      &::placeholder {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        background-color: transparent;
        color: ${colors.gray_05};
      }
    `;
  }}
`;
