import type { InputHTMLAttributes } from "react";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { TextField } from "./text.style";

interface Props<T extends FieldValues>
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "placeholder" | "disabled" | "type"
  > {
  path: Path<T>;
  register: UseFormRegister<T>;
  registerOptions: RegisterOptions;
}

export function UncontrolledText<T extends FieldValues>({
  path,
  register,
  registerOptions,
  disabled = false,
  ...rest
}: Props<T>) {
  return (
    <TextField
      id={path}
      className="reset"
      {...register(path, registerOptions)}
      disabled={disabled}
      {...rest}
    />
  );
}
