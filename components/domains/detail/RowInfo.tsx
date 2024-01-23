import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

export interface RowInfoData {
  place: string;
  startDate: string;
  endDate: string;
  ageLimit: number;
  runningTime: number;
  price: number;
  interMission: number;
}

export default function RowInfo({ infoData }: { infoData: RowInfoData }) {
  return (
    <Container>
      <KeyWrapper>
        <Key typo="subhead03">장소</Key>
        <Key typo="subhead03">기간</Key>
        <Key typo="subhead03">관람연령</Key>
        <Key typo="subhead03">러닝타임</Key>
        <Key typo="subhead03">인터미션</Key>
        <Key typo="subhead03">가격</Key>
      </KeyWrapper>
      <TextWrapper>
        <Text typo="body02">{infoData.place}</Text>
        <Text typo="body02">{`${dayjs(infoData?.startDate).format(
          "YYYY-MM-DD"
        )}~${dayjs(infoData?.endDate).format("YYYY-MM-DD")}`}</Text>
        <Text typo="body02">{`만 ${infoData.ageLimit}세 이상`}</Text>
        <Text typo="body02">{`총 ${infoData.runningTime}분`}</Text>
        <Text typo="body02">{`${infoData.interMission}분`}</Text>
        <Text typo="body02">{`${infoData.price}원`}</Text>
      </TextWrapper>
    </Container>
  );
}

const Key = styled(Typography)`
  margin-bottom: 1rem;
  display: block;
`;
const Text = styled(Typography)`
  margin-bottom: 1rem;
  display: block;
`;

const KeyWrapper = styled.div`
  margin-right: 1.5rem;
`;
const TextWrapper = styled.div``;

const Container = styled.div`
  display: flex;
`;
