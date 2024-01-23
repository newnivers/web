import type { ColumnDef } from "@tanstack/react-table";
import { SpacerSkleton } from "@/components/common/spacer";
import { Table } from "@/components/common/table";
import Typography from "@/components/common/text/Typography";
import { DeleteAdmin } from "./deleteAdmin";

const column: ColumnDef<any>[] = [
  { id: "id", header: "번호", accessorFn: (row) => row.id, size: 28 },
  {
    id: "created_at",
    header: "등록일",
    accessorFn: (row) => row.created_at,
    size: 77,
  },
  { id: "genre", header: "장르", accessorFn: (row) => row.genre, size: 28 },
  { id: "title", header: "작품명", accessorFn: (row) => row.title, size: 245 },
  {
    id: "admin_name",
    header: "관리자명",
    accessorFn: (row) => row.admin_name,
    size: 56,
  },
  {
    id: "status",
    header: "상태",
    accessorFn: (row) => row.status,
    size: 50,
  },
  {
    id: "is_approved",
    header: "승인",
    accessorFn: (row) => row.is_approved,
    size: 40,
  },
  {
    id: "selling",
    header: "판매현황",
    accessorFn: (row) => row.selling,
    size: 132,
  },
  {
    id: "admin",
    header: "관리",
    accessorFn: (row) => row.admin,
    size: 72,
    cell(props) {
      return <DeleteAdmin />;
    },
  },
];

const data: any[] = [
  {
    id: 1,
    created_at: "2023.11.12",
    genre: "공연",
    title: "현대무용<시차적>",
    admin_name: "최병현",
    status: "검수중",
    is_approved: "반려",
    selling: "10/29",
  },
];

export function EnrollmentCheckTable() {
  return (
    <SpacerSkleton type="vertical" gap={44}>
      <div>
        <Typography typo="subhead03">{`전체 ${data.length}건`}</Typography>
      </div>
      <Table name="enrollment-check-table" columns={column} data={data} />
    </SpacerSkleton>
  );
}
