import ReviewTab from "@/components/domains/detail/tab/review/ReviewTab";
import { DetailTabEnum } from "./type";

export default function DetailTabs({
  currentTab,
}: {
  currentTab: DetailTabEnum;
}) {
  switch (currentTab) {
    case DetailTabEnum.REVIEW:
      return <ReviewTab />;
    case DetailTabEnum.LOCATION:
      return <>장소</>;
    case DetailTabEnum.CANCEL_INFO:
      return <>취소</>;
    default:
      return <>상세정보</>;
  }
}
