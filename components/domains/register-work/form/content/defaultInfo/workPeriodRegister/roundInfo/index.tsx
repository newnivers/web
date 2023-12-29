import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled, { css } from "styled-components";
import { Field } from "@/components/common/field";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import type { WorkPeriod } from "../shared";

dayjs.locale("ko");

interface Props {
  workPeriod: WorkPeriod;
}

export function RoundInfo({ workPeriod }: Props) {
  const date = dayjs(workPeriod.date);

  const dateName = date.format("YYYY년 MM월 DD일 (ddd요일)");

  return (
    <Container type="vertical" gap={8} as="li">
      <SpacerSkleton
        justify="space-between"
        align="center"
        style={{ padding: "0 8px" }}
      >
        <DateTypography typo="body02">{dateName}</DateTypography>
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
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      &:first-child {
        padding-bottom: 20px;
      }

      &:not(:first-child) {
        padding: 20px 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.secondary[200]};
      }
    `;
  }}
`;

const DateTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary.black};
`;

const RoundList = styled.ul`
  padding: 0 8px;
`;
