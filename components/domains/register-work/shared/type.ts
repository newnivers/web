import type { WorkForm } from "@/types/register-work";

export type WorkFormSort = "default" | "detail" | "price" | "seat";

export type DefaultWorkForm = Pick<
  WorkForm,
  | "category"
  | "title"
  | "place"
  | "genre"
  | "age_limit"
  | "running_time"
  | "inter_mission"
  | "ticket_open_at"
  | "ticket_close_at"
  | "schedules"
>;

export type DetailWorkForm = Pick<
  WorkForm,
  "image" | "description" | "caution_description"
>;

export type PriceWorkForm = Pick<
  WorkForm,
  "is_free" | "purchase_limit_count" | "price"
>;

// 좌석 배치도에 대한 컬럼 추가 필요
export type SeatWorkForm = Pick<WorkForm, "reserved_seat">;

export interface WorkFormPerStep {
  default: DefaultWorkForm;
  detail: DetailWorkForm;
  price: PriceWorkForm;
  seat: SeatWorkForm;
}

export interface Classification {
  key: string;
  name: string;
  desc?: string[];
}

export interface EditorImage {
  name: string;
  source: string | ArrayBuffer | null;
}
