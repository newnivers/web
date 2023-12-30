import type {
  ForwardedRef,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import { forwardRef } from "react";
import { Field } from "@/components/common/field";

const CalendarText = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Field iconType="calendar">
      <Field.DefaultText ref={ref} {...props} type="button" className="reset" />
    </Field>
  );
});

export default CalendarText;
