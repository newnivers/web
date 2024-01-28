export interface Schedule {
  id: number;
  startAt: string;
  leftSeatCount: number;
}

export interface ReservationCalendarProps {
  schedules: Schedule[];
  disabled: boolean;
}
