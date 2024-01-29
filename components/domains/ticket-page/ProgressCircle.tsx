import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

export function ProgressCircle({ leftDate = 0 }: { leftDate: number }) {
  return (
    <Wrapper>
      <InnerCircle>
        <LeftDay>{`D-${leftDate}`}</LeftDay>
      </InnerCircle>
      <OuterCircle count={2} />
    </Wrapper>
  );
}

const makeBorder = (count: number) => {
  let result = "";
  for (let i = 0; i < 4; i += 1) {
    if (count > i) {
      result += `#F90 `;
    } else {
      result += `white `;
    }
  }

  return result;
};

const Wrapper = styled.div`
  position: relative;
`;

const InnerCircle = styled.div`
  width: 200px;
  height: 200px;
  border: 9px solid;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OuterCircle = styled.div<{ count: number }>`
  position: absolute;
  top: 0;
  width: 200px;
  height: 200px;
  border: 9px solid;
  border-radius: 50%;
  border-color: ${({ count }) => makeBorder(count)};
  rotate: 45deg;
`;

const LeftDay = styled(Typography)`
  color: white;
`;
