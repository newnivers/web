const detailFixture = {
  message: "작품 상세 정보 조회에 성공했습니다.",
  data: {
    id: 3,
    user: 1,
    place: "빨간대문",
    title: "test",
    image: "http://www.naver.com",
    genre: "test",
    category: "SHOW",
    status: "APPROVED",
    runningTime: 40,
    ageLimit: 0,
    interMission: 10,
    description: "testtesttest",
    cautionDescription: "testetest",
    csPhoneNumber: "+821051972093",
    reservedSeat: false,
    startDate: "2023-11-16T08:30:00Z",
    endDate: "2023-11-18T15:00:00Z",
    isFree: false,
    purchaseLimitCount: 5,
    price: "10000.00",
    schedules: [
      {
        id: 6,
        startAt: "2023-11-17T17:30:00+09:00",
        endAt: "2023-11-19T00:00:00+09:00",
        seatCount: 100,
      },
      {
        id: 5,
        startAt: "2023-11-16T17:30:00+09:00",
        endAt: "2023-11-17T00:00:00+09:00",
        seatCount: 100,
      },
    ],
    ticketOpenAt: "2023-11-17T17:30:00+09:00",
    ticketCloseAt: "2023-11-30T17:30:00+09:00",
    createdAt: "2023-11-19T17:20:48.206593+09:00",
    updatedAt: "2023-11-19T17:20:48.206614+09:00",
  },
};

export default detailFixture;
