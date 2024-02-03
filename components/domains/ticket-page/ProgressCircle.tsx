import { useMemo } from "react";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

export function ProgressCircle({ leftDay = 0 }: { leftDay: number }) {
  const isValidDate = (day: number) => {
    return day < 5 && day > 0;
  };

  const calculatedPercentage = useMemo(() => {
    if (!isValidDate(leftDay)) {
      return 0;
    } else {
      const progress = ((5 % leftDay) * 20) / 100;

      return 2 * Math.PI * 90 * (1 - progress);
    }
  }, [leftDay]);

  return (
    <Wrapper>
      <LeftDay>{`D-${leftDay}`}</LeftDay>
      <CircleSvg
        className="circle_progress"
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <Outer
          className="progress__meter"
          cx="100"
          cy="100"
          r="90"
          strokeWidth="12"
          stroke={isValidDate(leftDay) ? "#e6e6e6" : "none"}
        />
        {}
        {isValidDate(leftDay) && (
          <Bar
            dash={calculatedPercentage}
            className="progress__ing"
            cx="100"
            cy="100"
            r="90"
            strokeWidth={"12"}
          />
        )}
      </CircleSvg>
    </Wrapper>
  );
}

const CircleSvg = styled.svg`
  transform: rotate(-90deg);
`;

const Bar = styled.circle<{ dash: number }>`
  stroke: ${({ theme }) => theme.colors.primary.point};
  fill: none;
  stroke-dasharray: ${2 * Math.PI * 90};
  stroke-dashoffset: ${({ dash }) => dash};
`;

const Outer = styled.circle`
  fill: rgba(10, 10, 10, 0.8);
`;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const LeftDay = styled(Typography)`
  z-index: 1;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
