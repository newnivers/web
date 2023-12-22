import { useController } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form";
import { TextField } from "./text.style";

interface Props extends UseControllerProps {
  placeholder?: string;
  disabled?: boolean;
}

export function ControlledText({
  placeholder = "",
  disabled = false,
  ...controllerProps
}: Props) {
  const { field } = useController(controllerProps);

  return (
    <TextField
      className="reset"
      id={field.name}
      {...field}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
