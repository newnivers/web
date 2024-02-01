export interface Art {
  id: number;
  createdAt: Date;
  genre: string;
  title: string;
  status: string;
  createdBy: string;
  schedules: Schedule[];
}

export interface Schedule {
  id: number;
  leftSeatCount: number;
  seatMaxCount: number;
}
