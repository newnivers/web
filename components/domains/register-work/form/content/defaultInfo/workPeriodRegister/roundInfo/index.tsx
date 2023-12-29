import Image from "next/image";
import styled from "styled-components";
import { Field } from "@/components/common/field";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { WorkPeriod } from "../shared";

interface Props {
  workPeriod: WorkPeriod;
}

export function RoundInfo({ workPeriod }: Props) {
  return (
    <Spacer type="vertical" gap={8} as="li">
      <SpacerSkleton
        justify="space-between"
        align="center"
        style={{ padding: "0 8px" }}
      >
        <DateTypography typo="body02">{`2023년 12월 18일 (수요일)`}</DateTypography>
        <button>
          <Image
            src="/icon/default-close.svg"
            width={24}
            height={24}
            alt="default-close"
          />
        </button>
      </SpacerSkleton>
      <RoundList>
        <Spacer align="center" gap={12} as="li" style={{ padding: "8px 0" }}>
          <Typography typo="subhead03">1회차</Typography>
          <Field style={{ width: "319px" }}>
            <Field.DefaultSelector selectOptions={[]} onSelect={() => {}} />
          </Field>
          <SpacerSkleton align="center" gap={12}>
            <button>
              <Image
                src="/icon/work-period-add.svg"
                width={24}
                height={24}
                alt="work-period-add"
              />
            </button>
            <button>
              <Image
                src="/icon/work-period-delete.svg"
                width={24}
                height={24}
                alt="work-period-delete"
              />
            </button>
          </SpacerSkleton>
        </Spacer>
      </RoundList>
    </Spacer>
  );
}

const DateTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary.black};
`;

const RoundList = styled.ul`
  padding: 0 8px;
`;
