export const mockRes = {
  message: "등록확인 리스트 페이지 조회에 성공했습니다..",
  data: [
    {
      id: 33,
      createdAt: "2024-01-30T14:28:38.045106+09:00",
      genre: "test",
      title: "test",
      status: "APPROVED",
      createdBy: "test",
      schedules: [
        {
          id: 57,
          leftSeatCount: 48,
          seatMaxCount: 100,
        },
        {
          id: 58,
          leftSeatCount: 1,
          seatMaxCount: 100,
        },
      ],
    },
    {
      id: 32,
      createdAt: "2024-01-30T14:27:02.689494+09:00",
      genre: "test",
      title: "test",
      status: "APPROVED",
      createdBy: "test",
      schedules: [
        {
          id: 55,
          leftSeatCount: 99,
          seatMaxCount: 100,
        },
        {
          id: 56,
          leftSeatCount: 99,
          seatMaxCount: 100,
        },
      ],
    },
    {
      id: 30,
      createdAt: "2024-01-30T14:20:29.129058+09:00",
      genre: "test",
      title: "test",
      status: "APPROVED",
      createdBy: "test",
      schedules: [
        {
          id: 51,
          leftSeatCount: 68,
          seatMaxCount: 0,
        },
        {
          id: 52,
          leftSeatCount: 119,
          seatMaxCount: 0,
        },
      ],
    },
    {
      id: 5,
      createdAt: "2023-12-19T20:13:59.079114+09:00",
      genre: "test",
      title: "test",
      status: "APPROVED",
      createdBy: "test",
      schedules: [
        {
          id: 10,
          leftSeatCount: 0,
          seatMaxCount: 0,
        },
        {
          id: 9,
          leftSeatCount: 0,
          seatMaxCount: 0,
        },
      ],
    },
    {
      id: 1,
      createdAt: "2023-11-18T18:01:33.129115+09:00",
      genre: "test",
      title: "test",
      status: "APPROVED",
      createdBy: "test",
      schedules: [
        {
          id: 1,
          leftSeatCount: 0,
          seatMaxCount: 0,
        },
        {
          id: 2,
          leftSeatCount: 0,
          seatMaxCount: 0,
        },
      ],
    },
  ],
};

export const displayedStatus: { [key: string]: string } = {
  APPROVED: "승인",
  REJECTED: "반려",
  PENDING: "대기",
};
