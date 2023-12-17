import { useController } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import { TextField } from "./text.style";

interface Props extends UseControllerProps {
  placeholder?: string;
  disabled?: boolean;
}

export function ControlledInput({
  placeholder = "",
  disabled = false,
  ...controllerProps
}: Props) {
  const { field } = useController(controllerProps);

  return (
    <TextField
      className="reset"
      {...field}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
