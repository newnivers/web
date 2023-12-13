export type WorkStatus = "PENDING" | "REJECTED" | "APPROVED";

export type WorkCategory = "EXHIBITION" | "SHOW";

export interface Schedule {
  start_at: string;
  end_at: string;
  seat_count: number;
}

export interface WorkForm {
  place: number;
  title: string;
  image: string;
  genre: string;
  status: WorkStatus;
  category: WorkCategory;
  running_time: number;
  age_limit: number;
  inter_mission: number;
  description: string;
  caution_description: string;
  cs_phone_number: string;
  is_free: boolean;
  reserved_seat: boolean;
  purchase_limit_count: number;
  price: number;
  schedules: Schedule[];
  ticket_open_at: string;
  ticket_close_at: string;
}
