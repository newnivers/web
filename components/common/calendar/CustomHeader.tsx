import Image from "next/image";
import { getMonth, getYear } from "date-fns";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";
import backArrowSrc from "@/public/icon/back_icon.png";
import frontArrowSrc from "@/public/icon/front_icon.png";

export default function CustomHeader({
  headerProps,
}: {
  headerProps: ReactDatePickerCustomHeaderProps;
}) {
  return (
    <CalendarCustomHeader>
      <button
        onClick={headerProps.decreaseMonth}
        disabled={headerProps.prevMonthButtonDisabled}
      >
        <Image src={frontArrowSrc} alt={"front-arrow"} width={24} height={24} />
      </button>
      <Typography typo="subhead02">{`${getYear(headerProps.date)}년 ${
        getMonth(headerProps.date) + 1
      }월`}</Typography>
      <button
        onClick={headerProps.increaseMonth}
        disabled={headerProps.nextMonthButtonDisabled}
      >
        <Image src={backArrowSrc} alt={"back-arrow"} width={24} height={24} />
      </button>
    </CalendarCustomHeader>
  );
}

const CalendarCustomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
