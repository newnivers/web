import Image from "next/image";
import styled from "styled-components";
import type { RowInfoData } from "@/components/domains/detail/RowInfo";
import RowList from "@/components/domains/detail/RowInfo";

export interface TicketMainInfoProps {
  image: string;
  infoData: RowInfoData;
}

export default function TicketMainInfo({
  infoData,
  image,
}: TicketMainInfoProps) {
  return (
    <MainInfoContainer>
      <ImageWrapper>
        <Image width={368} height={480} src={image} alt="ticket-image" />
      </ImageWrapper>
      <RowList infoData={infoData} />
    </MainInfoContainer>
  );
}

const ImageWrapper = styled.div`
  width: 368px;
  height: 552px;
  margin-right: 1.5rem;
  overflow: hidden;
`;

const MainInfoContainer = styled.div`
  display: flex;
`;
