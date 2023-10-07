import { useCallback, useMemo } from "react";
import { getMonth, getYear, startOfDay, add } from "date-fns";
import DatePicker from "react-datepicker";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import styled, { css } from "styled-components";
import { commonFieldStyle, resetDateInputStyle } from "./shared";
import { SpacerSkleton } from "../spacer";

interface Props {
  rawDate: Date | null | [Date | null, Date | null];
  selectsRange?: boolean;
  placeholder?: string;
  onChange?: (...event: any[]) => void;
}

const now = new Date();

function CustomDatePickerHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <HeaderContainer justify="center" align="center" gap={10}>
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        이전 날짜
      </button>
      <div id="date-info">{`${getYear(date)}.${getMonth(
        add(date, { months: 1 })
      )}`}</div>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        다음 날짜
      </button>
    </HeaderContainer>
  );
}

export function DateField({
  rawDate,
  selectsRange = false,
  placeholder = "날짜 선택",
  onChange,
}: Props) {
  const currentDate = useMemo(() => {
    return Array.isArray(rawDate)
      ? { start: rawDate[0], end: rawDate[1] }
      : { start: rawDate };
  }, [rawDate]);

  const onChangeDate = useCallback(
    (update: any) => {
      console.log(update);
      if (onChange) {
        onChange(update);
      }
    },
    [onChange]
  );

  return (
    <Container>
      <StyledDatePicker
        dateFormat="yyyy.MM.dd"
        selected={currentDate?.start}
        startDate={currentDate?.start}
        endDate={currentDate?.end}
        renderCustomHeader={(props) => <CustomDatePickerHeader {...props} />}
        placeholderText={placeholder}
        minDate={startOfDay(now)}
        selectsRange={selectsRange}
        onChange={onChangeDate}
      />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      & * {
        font-family: "Helvetica Neue", helvetica, arial, sans-serif;
        font-weight: 500;
      }
      & > .react-datepicker-wrapper {
        display: block;
      }

      & > .react-datepicker__tab-loop {
        .react-datepicker-popper {
          .react-datepicker {
            .react-datepicker__triangle {
              display: none;
            }

            .react-datepicker__header {
              margin-top: 5px;
              background: none;
              border: none;

              .react-datepicker__day-names {
                display: none;
              }
            }
          }
        }
      }
    `;
  }}
`;

const StyledDatePicker = styled(DatePicker)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      ${commonFieldStyle};
      ${resetDateInputStyle};
    `;
  }}
`;

const HeaderContainer = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      & > button {
        display: flex;
        justify-content: center;
        align-items: center;

        border: none;
        background: none;
      }

      & > div[id="date-info"] {
        color: ${colors.primary_02};
        font-size: 13.5px;
      }
    `;
  }}
`;
