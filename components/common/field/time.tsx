import { useState } from "react";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import { commonFieldStyle, resetSelectInputStyle } from "./shared";

interface Props {
  timeCaption?: string;
  placeholderText?: string;
  timeIntervals?: number;
}

export function TimeOnlyPickerField({
  timeCaption,
  placeholderText,
  timeIntervals = 15,
}: Props) {
  const [state, setState] = useState<Date | null>();

  return (
    <Container>
      <StyledTimeOnlyPicker
        dateFormat="a hh시 mm분"
        timeFormat="a hh:mm"
        selected={state}
        onChange={(date) => {
          console.log(date);
          setState(date);
        }}
        timeCaption={timeCaption}
        timeIntervals={timeIntervals}
        placeholderText={placeholderText}
        showTimeSelect
        showTimeSelectOnly
        locale={ko}
      />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => {
    return css`
      & * {
        font-family: "Helvetica Neue", helvetica, arial, sans-serif;
        font-weight: 400;
      }

      & > .react-datepicker-wrapper {
        display: block;
      }

      & > .react-datepicker__tab-loop {
        position: relative;

        .react-datepicker-popper {
          width: 100%;

          .react-datepicker--time-only {
            width: 100%;
            border: none;

            .react-datepicker__triangle {
              display: none;
            }

            .react-datepicker__time-container {
              width: 100%;
              border: 1px solid #aeaeae;
              border-radius: 0.3rem;

              .react-datepicker__header {
              }

              .react-datepicker__time-box {
                width: 100%;

                .react-datepicker__time-list {
                  .react-datepicker__time-list-item {
                    height: 40px;
                    padding: 12px 10px;
                  }
                }
              }
            }
          }
        }
      }
    `;
  }}
`;

const StyledTimeOnlyPicker = styled(DatePicker)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      ${commonFieldStyle};
      ${resetSelectInputStyle};
      white-space: nowrap;
    `;
  }}
`;
