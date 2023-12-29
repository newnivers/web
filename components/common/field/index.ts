import {
  ControlledText,
  TextField,
  UncontrolledText,
  ControlledSelector,
  DefaultSelector,
  Checkbox,
} from "./core";
import { DefaultFieldTemplate } from "./template.default";

export const Field = Object.assign(DefaultFieldTemplate, {
  DefaultText: TextField,
  ControlledText,
  UncontrolledText,
  ControlledSelector,
  DefaultSelector,
  Checkbox,
});
