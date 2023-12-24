import { useState } from "react";
import { CustomCalendar, CustomHeader } from "@/components/common/calendar";

export function WorkPeriodModalContent() {
  const [dates, setDates] = useState<Date[]>([]);

  const onChangeDate = (date: Date | null) => {
    if (!date) {
      return;
    }

    setDates([...dates, date]);
  };

  return (
    <CustomCalendar
      renderCustomHeader={(headerProps) => (
        <CustomHeader headerProps={headerProps} />
      )}
      selected={null}
      onChangeDate={onChangeDate}
      highlightDates={dates}
    />
  );
}
