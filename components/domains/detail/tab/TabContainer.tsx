import { useState } from "react";
import { DetailTabEnum } from "@/components/domains/detail/tab/type";
import DetailTabs from "./DetailTabs";
import TabNavigation from "./TabNavigation";

export default function TabContainer() {
  const [currentTab, setCurrentTab] = useState<DetailTabEnum>(
    DetailTabEnum.INFO
  );

  return (
    <>
      <TabNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <DetailTabs currentTab={currentTab} />
    </>
  );
}
