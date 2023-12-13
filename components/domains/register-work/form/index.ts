import type { ComponentType } from "react";
import { WorkForm } from "./context";
import { DefaultInfo } from "./defaultInfo";
import { DetailInfo } from "./detailInfo";
import { PriceInfo } from "./priceInfo";
import { SeatInfo } from "./seatInfo";
import { RegisterWorkFormTemplate } from "./template";
import type { WorkFormSort } from "../shared/type";

const WorkFormComponents: { [sort in WorkFormSort]: ComponentType<any> } = {
  default: DefaultInfo,
  detail: DetailInfo,
  price: PriceInfo,
  seat: SeatInfo,
};

export { RegisterWorkFormTemplate, WorkFormComponents, WorkForm };
