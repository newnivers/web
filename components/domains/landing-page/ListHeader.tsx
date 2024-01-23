import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

export const ListHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Wrapper>
      <Title typo="headline">{title}</Title>
      <Description typo="body02">{description}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled(Typography)``;
const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary[500]};
`;
