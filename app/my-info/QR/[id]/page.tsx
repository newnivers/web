"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import httpClient from "@/api/core";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";

interface TicketInfo {
  id: number;
  artScheduleDate: string;
  artTitle: string;
  place: string;
  nickname: string;
  artThumbnail: string;
  qrCode: string;
}

const days = ["일", "월", "화", "수", "목", "금", "토"];

function QRPage() {
  const params = useParams();

  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);

  useEffect(() => {
    if (ticketInfo) {
      return;
    }
    (async () => {
      const res = await httpClient.get(`/arts/tickets/${params.id}`);

      setTicketInfo(res.data);
    })();
  }, [params, ticketInfo]);

  if (!ticketInfo) {
    return (
      <SpacerSkleton
        type="vertical"
        justify="center"
        align="center"
        gap={30}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image
          src="/img/spin-1s-767px.gif"
          width={100}
          height={100}
          alt="spin"
        />
        <Typography typo="subhead01">티켓 정보를 조회 중 입니다.</Typography>
      </SpacerSkleton>
    );
  }

  const artSchedule = dayjs(ticketInfo.artScheduleDate);

  return (
    <SpacerSkleton
      type="vertical"
      justify="center"
      align="center"
      gap={12}
      style={{
        padding: "100px 0",
      }}
    >
      <Image
        src="/icon/plavnewniverse_black_logo.svg"
        width={120}
        height={50}
        alt="logo"
      />
      <Typography typo="subhead01">티켓 인증</Typography>

      <SpacerSkleton type="vertical" align="center" gap={30}>
        {ticketInfo?.qrCode ? (
          <Image
            src={ticketInfo.qrCode}
            width={200}
            height={200}
            alt="qr-code"
          />
        ) : (
          <SpacerSkleton type="vertical">
            <Typography typo="subhead02">
              QR은 작품 2시간 전 생성됩니다.
            </Typography>
            <Typography typo="subhead03">
              QR로 관객확인 및 입장이 가능합니다.
            </Typography>
          </SpacerSkleton>
        )}
        <SpacerSkleton gap={10}>
          <SpacerSkleton
            type="vertical"
            style={{
              width: "100%",
            }}
          >
            <SpacerSkleton type="vertical" gap={18}>
              <SpacerSkleton type="vertical">
                <Typography typo="subhead02">작품명</Typography>
                <Typography typo="body01">{ticketInfo.artTitle}</Typography>
              </SpacerSkleton>
              <SpacerSkleton type="vertical">
                <Typography typo="subhead02">장소</Typography>
                <Typography typo="body01">{ticketInfo.place}</Typography>
              </SpacerSkleton>
              <SpacerSkleton type="vertical">
                <Typography typo="subhead02">예약자</Typography>
                <Typography typo="body01">{ticketInfo.nickname}</Typography>
              </SpacerSkleton>
              <SpacerSkleton type="vertical">
                <Typography typo="subhead02">관람일시</Typography>
                <Typography typo="body01">
                  {`${artSchedule.format("YYYY-MM-DD HH:mm")}`}
                  &nbsp;
                  {`(${days[artSchedule.day()]})`}
                </Typography>
              </SpacerSkleton>
            </SpacerSkleton>
          </SpacerSkleton>
        </SpacerSkleton>
      </SpacerSkleton>
    </SpacerSkleton>
  );
}

export default QRPage;
