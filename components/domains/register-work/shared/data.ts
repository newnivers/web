import type { WorkFormSort } from "./type";

export const titles: { [key in WorkFormSort]: string } = {
  default: "기본정보",
  detail: "상세정보",
  price: "가격정보",
  seat: "좌석정보",
};

export const subTitles: {
  [key in WorkFormSort]: { key: string; name: string; desc?: string[] }[];
} = {
  default: [
    { key: "work-info", name: "작품 정보" },
    { key: "ticket-schedule", name: "티켓 일정" },
    {
      key: "show-period",
      name: "공연 기간",
      desc: [
        `공연이 없는 날은 '삭제'하여 주세요`,
        `하루에 공연이 여러 번 있는 날은 '추가'하여 작성해 주세요.`,
      ],
    },
  ],
  detail: [],
  price: [],
  seat: [],
};

export const steps: WorkFormSort[] = ["default", "detail", "price", "seat"];
