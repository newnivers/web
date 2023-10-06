import { getMonth, getYear, startOfDay, add } from "date-fns";
import DatePicker from "react-datepicker";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import styled, { css } from "styled-components";
import { commonFieldStyle } from "./shared";
import { SpacerSkleton } from "../spacer";

interface Props {
  placeholder?: string;
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

export function DateField({ placeholder = "날짜 선택" }: Props) {
  return (
    <Container>
      <StyledDatePicker
        renderCustomHeader={(props) => <CustomDatePickerHeader {...props} />}
        placeholderText={placeholder}
        minDate={startOfDay(now)}
        onChange={(date) => {
          console.log(date);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      & > .react-datepicker-wrapper {
        display: block;
      }

      & > .react-datepicker__tab-loop {
        .react-datepicker-popper {
          .react-datepicker {
            .react-datepicker__header {
              margin-top: 5px;
              background: none;
              border: none;

              .react-datepicker__day-names {
                display: none;
              }
            }

            .react-datepicker__triangle {
              display: none;
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

      text-align: center;
      cursor: pointer;
      caret-color: transparent;

      &:focus {
        outline: none;
      }
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
      }
    `;
  }}
`;
