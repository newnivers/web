import Image from "next/image";
import styled from "styled-components";
import type { RowInfoData } from "@/components/domains/detail/RowInfo";
import RowList from "@/components/domains/detail/RowInfo";
import mockImage from "@/fixture/ticket-poster.jpeg";

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
        <Image
          src={mockImage}
          alt="ticket-image"
          style={{ width: "100%", height: "100%" }}
        />
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
