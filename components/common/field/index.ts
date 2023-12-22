import {
  ControlledText,
  TextField,
  UncontrolledText,
  Selector,
  Checkbox,
} from "./core";
import { DefaultFieldTemplate } from "./template.default";

export const Field = Object.assign(DefaultFieldTemplate, {
  DefaultText: TextField,
  ControlledText,
  UncontrolledText,
  Selector,
  Checkbox,
});
