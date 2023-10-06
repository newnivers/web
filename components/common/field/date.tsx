import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import { commonFieldStyle } from "./shared";

export function DateField() {
  return (
    <Container>
      <StyledDatePicker onChange={(date) => {}} />
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

      cursor: pointer;
      caret-color: transparent;

      &:focus {
        outline: none;
      }
    `;
  }}
`;
