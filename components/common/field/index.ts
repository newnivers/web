import { FieldInput } from "./input";
import { FieldTemplate } from "./template";

const Field = Object.assign(FieldTemplate, {
  input: FieldInput,
});

export default Field;
