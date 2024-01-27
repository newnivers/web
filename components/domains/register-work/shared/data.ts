import type { WorkFormSort, Classification } from "./type";

export const titles: { [key in WorkFormSort]: string } = {
  default: "기본정보",
  detail: "상세정보",
  price: "가격정보",
  seat: "좌석정보",
};

export const classificationInfo: {
  [key in WorkFormSort]: Classification[];
} = {
  default: [
    { key: "work-info", name: "작품정보" },
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
  detail: [
    {
      key: "detail-info",
      name: "상세 정보",
    },
  ],
  price: [
    {
      key: "price-info",
      name: "가격정보",
    },
  ],
  seat: [
    {
      key: "seat-info",
      name: "좌석정보",
    },
  ],
};

export const steps: WorkFormSort[] = ["default", "detail", "price", "seat"];

export const defaultDescription = `<div>
<h3>공연시간 정보</h3>
<p>2023년 00월 00일(금) ~ 2023년 00월 00일(일)</p>
<p>화~금 00시 / 주말 00시, 00시</p>
<p>* 휴관일 없음</p>
<br />
<h3>공지사항</h3>
<ul>
    <li>티켓오픈: 2023년 00월 00일(금) 00시</li>
    <li>예매마감: 공연 시작 3시간 전까지</li>
    <li>취소마감: 공연 전일 17시</li>
</ul>
<br />
<h3>알립니다</h3>
<ul>
    <li>티켓분실 및 미지참시 재발급 및 입장은 절대불가하오니 티켓분실에 유의하시기 바랍니다.</li>
    <li>14세 이상 중/고등학생 관람 할인 구매, 현장에서 나이 확인이 가능한 증명서류를 지참하시기 바랍니다.</li>
    <li>외부음식 1인 1개까지 극내부로</li>
</ul>
<br />
<p>* 무료입장권 제한</p>
<p>- 제한 기간: 2023년 00월 00일(금) 00시 ~ 2023년 00월 00일(일) 00시</p>
</div>
`;

export const defaultCautionDescription = `
<div>
  <h3>예매 유의사항</h3>
  <ul>
    <li>본 공연은 00시에 시작합니다.</li>
    <li>바탕색 없는표를 미리 준비하시면 좌석 오류시 빠르게 대처하실 수 있습니다.</li>
    <li>티켓 수령은 예매자 본인 수령이 원칙입니다.</li>
    <li>공연장 내 음식물 섭취(음료, 물품 포함)와 사진촬영이 금지되어 있습니다.</li>
    <li>공연장 내 음식물 섭취(음료, 물품 포함)와 사진촬영이 금지되어 있습니다.</li>
    <li>공연 티켓 분실 시에는 재발급이 불가능합니다.</li>
    <li>리셀러로부터 공연시간 1시간 전부터 오른다는 내용입니다.</li>
    <li>가상계좌 결제시 예매일 익일 오후 23시 59분까지 입금하시지 않으시면 자동으로 예매 취소되니, 교통편 안내도 필요없겠습니다.</li>
    <li>공연장은 안내원들의 안내에 적극 협조해주시기 바랍니다.</li>
    <li>공연장에는 반드시 한국계좌를 통한 출금자료를 첨부 지참하셔야합니다.</li>
  </ul>
    <br />
  <h3>예매 관련 유의사항</h3>
  <ul>
    <li>관련된 문의 해결하신 것은 취소, 변경, 환불 불가합니다.</li>
    <li>이번 달의 휴일은 다음과 같이 이루어집니다.</li>
  </ul>
    <br />
  <h3>취소 수수료</h3>
  <ul>
    <li>예매 후 - 관련업체 3일 전까지(전정) : 없음</li>
    <li>관련업체 2일 전 - 관련업체 1일 전까지 : 티켓 금액의 30%</li>
    <li>단, 관련업체에서 1,000원 미만일 경우 추가 수수료 전체금액의 최소 결제금액 적용으로 인해 1,000원 부과</li>
  </ul>
</div>

`;

export const workPlaces = [
  { value: "0", label: "남산" },
  { value: "1", label: "예장" },
  { value: "2", label: "빨간대문" },
  { value: "3", label: "장소정보 참고" },
];
