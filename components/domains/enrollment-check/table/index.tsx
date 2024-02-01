import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import styled from "styled-components";
import { getCheckList } from "@/api";
import { SpacerSkleton } from "@/components/common/spacer";
import { Table } from "@/components/common/table";
import Typography from "@/components/common/text/Typography";
import { DeleteAdmin } from "./deleteAdmin";
import { displayedStatus } from "../data";

const column: ColumnDef<any>[] = [
  { id: "id", header: "번호", accessorFn: (row) => row.id, size: 28 },
  {
    id: "created_at",
    header: "등록일",
    accessorFn: (row) => row.created_at,
    size: 84,
  },
  { id: "genre", header: "장르", accessorFn: (row) => row.genre, size: 70 },
  { id: "title", header: "작품명", accessorFn: (row) => row.title, size: 245 },
  {
    id: "createdBy",
    header: "관리자명",
    accessorFn: (row) => row.createdBy,
    size: 58,
  },
  {
    id: "status",
    header: "상태",
    accessorFn: (row) => row.status,
    size: 60,
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

export function EnrollmentCheckTable() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const updated: any[] = [];

    (async () => {
      const { data } = await getCheckList();

      data.forEach((work) => {
        const { schedules, ...rest } = work;

        schedules.forEach((schedule) => {
          const { id, leftSeatCount, seatMaxCount } = schedule;

          const row = {
            id,
            created_at: dayjs(rest.createdAt).format("YYYY.MM.DD"),
            genre: rest.genre,
            title: rest.title,
            createdBy: rest.createdBy,
            status: displayedStatus[rest.status],
            selling: `${leftSeatCount}/${seatMaxCount}`,
          };

          updated.push(row);
        });

        setList(updated);
      });
    })();
  }, []);

  if (list.length === 0) {
    return;
  }

  return (
    <SpacerSkleton id="main-content" type="vertical" gap={44}>
      <div>
        <Typography typo="subhead03">{`전체 ${list.length}건`}</Typography>
      </div>
      <TableContainer>
        <Table name="enrollment-check-table" columns={column} data={list} />
      </TableContainer>
    </SpacerSkleton>
  );
}

const TableContainer = styled.div`
  height: 600px;
  overflow: scroll;
`;
