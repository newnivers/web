import { DateField } from "./date";
import { DropdownField } from "./dropdown";
import { InputField } from "./input";
import { ReadOnlyTemplate, ReadOnlyInput } from "./shared";
import { FieldTemplate } from "./template";
import { TimeOnlyPickerField } from "./time";

const Field = Object.assign(FieldTemplate, {
  Input: InputField,
  Dropdown: DropdownField,
  Date: DateField,
  TimeOnly: TimeOnlyPickerField,
});

const ReadOnlyField = Object.assign(ReadOnlyTemplate, {
  Input: ReadOnlyInput,
});

export { Field, ReadOnlyField };
