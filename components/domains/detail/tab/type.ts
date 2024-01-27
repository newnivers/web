import Info from "@/components/domains/detail/tab/InfoTab";
import Location from "@/components/domains/detail/tab/LocationTab";
import ReserveAndCancel from "@/components/domains/detail/tab/ReserveAndCancelTab";
import Review from "@/components/domains/detail/tab/review/ReviewTab"

export enum DetailTabEnum {
  INFO = "Info",
  REVIEW = "Review",
  LOCATION = "Location",
  CANCEL_INFO = "CancelInfo",
}

export const tabMap = {
  [DetailTabEnum.REVIEW]: Review,
  [DetailTabEnum.INFO]: Info,
  [DetailTabEnum.LOCATION]: Location,
  [DetailTabEnum.CANCEL_INFO]: ReserveAndCancel,
};
