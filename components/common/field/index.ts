import { FieldInput } from "./input";
import { ReadOnlyTemplate, ReadOnlyInput } from "./shared";
import { FieldTemplate } from "./template";

const Field = Object.assign(FieldTemplate, {
  Input: FieldInput,
});

const ReadOnlyField = Object.assign(ReadOnlyTemplate, {
  Input: ReadOnlyInput,
});

export { Field, ReadOnlyField };
