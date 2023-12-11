import styled, { css } from "styled-components";
import { SpacerSkleton } from "../spacer";
import Text, { TextTags } from "../text";

interface Props {
  name: string;
  desc?: string[];
}

function TitleColumn({ name, desc }: Props) {
  return (
    <Container align="center" gap={12}>
      <Text as={TextTags.h3}>{name}</Text>
      {desc && (
        <Desc>
          {desc.map((text, idx) => (
            <li key={`${text}-${idx}`}>{text}</li>
          ))}
        </Desc>
      )}
    </Container>
  );
}

const Container = styled(SpacerSkleton)`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      width: 100%;
      padding-bottom: 5px;
      text-align: left;
      border-bottom: 1px solid ${colors.gray[400]};

      & > h3 {
        font-size: 24px;
        font-weight: 600;
        line-height: 36px;
        color: ${colors.secondary.black};
      }
    `;
  }}
`;

const Desc = styled.ul`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      & li {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        color: ${colors.secondary[500]};

        &::before {
          content: "•";
          margin-right: 8px;
        }
      }
    `;
  }}
`;

export default TitleColumn;
