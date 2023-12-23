export interface Schedule {
  id: number;
  startAt: string;
  endAt: string;
  seatCount: number;
}

export interface ReservationCalendarProps {
  schedules: Schedule[];
  disabled: boolean;
}
