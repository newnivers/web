import {
  ControlledInput,
  TextField,
  UncontrolledInput,
  Selector,
} from "./core";
import { DefaultFieldTemplate } from "./template.default";

export const Field = Object.assign(DefaultFieldTemplate, {
  DefaultText: TextField,
  ControlledInput,
  UncontrolledInput,
  Selector,
});
