import type { ComponentType } from "react";
import { DefaultInfo, DetailInfo, PriceInfo, SeatInfo } from "./content";
import { WorkForm } from "./context";
import { RegisterWorkFormTemplate } from "./template";
import type { WorkFormSort, Classification } from "../shared/type";

const WorkFormComponents: {
  [sort in WorkFormSort]: ComponentType<{ classifications: Classification[] }>;
} = {
  default: DefaultInfo,
  detail: DetailInfo,
  price: PriceInfo,
  seat: SeatInfo,
};

export { RegisterWorkFormTemplate, WorkFormComponents, WorkForm };
