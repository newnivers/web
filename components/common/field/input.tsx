import type { InputHTMLAttributes } from "react";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
  UseFormResetField,
} from "react-hook-form";
import styled, { css } from "styled-components";

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
      display: block;
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-weight: 400;
      border: none;
      color: inherit;

      &::placeholder {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
      }

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px ${colors.white} inset;
        -webkit-text-fill-color: ${colors.black_01};
      }
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        background-color: transparent;
      }
    `;
  }}
`;
