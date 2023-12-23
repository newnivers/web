import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import type { ReactDatePickerProps } from "react-datepicker";
import DatePicker from "react-datepicker";
import "./calendarStyle.scss";

type CustomCalendarProps = Omit<ReactDatePickerProps, "onChange"> & {
  onClickDate: Dispatch<SetStateAction<Date | null>>;
  // yyyy-MM-dd 포멧으로 변환된 날짜의 모음입니다.
  notCompleteDates?: string[];
};

export default function CustomCalendar({
  onClickDate,
  notCompleteDates = [],
  ...rest
}: CustomCalendarProps) {
  const [month, setMonth] = useState(new Date());

  const makeDayClassName = useCallback(
    (date: Date) => {
      const isMonthSame = month.getMonth() !== date.getMonth();

      if (isMonthSame) {
        return "react-datepicker__day--exclude";
      }

      const formattedDay = format(date, "yyyy-MM-dd");

      if (notCompleteDates.includes(formattedDay)) {
        return "react-datepicker__day--not-complete";
      }

      return "";
    },
    [month, notCompleteDates]
  );

  return (
    <DatePicker
      {...rest}
      onChange={(date) => onClickDate(date)}
      showDisabledMonthNavigation
      inline
      locale={ko}
      onMonthChange={setMonth}
      disabledKeyboardNavigation
      dayClassName={makeDayClassName}
    />
  );
}
