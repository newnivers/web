import type { ReactNode } from "react";
import { Children, useState, useMemo, isValidElement } from "react";
import { DetailTabEnum, tabMap } from "@/components/domains/detail/tab/type";
import TabNavigation from "./TabNavigation";

export default function TabContainer({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<DetailTabEnum>(
    DetailTabEnum.INFO
  );

  const tabComponent = useMemo(() => {
    const childrenArray = Children.toArray(children);

    return childrenArray.filter((child) => {
      return isValidElement(child) && child.type === tabMap[currentTab];
    })[0];
  }, [currentTab, children]);

  return (
    <>
      <TabNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabComponent}
    </>
  );
}
