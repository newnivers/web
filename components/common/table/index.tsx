import { Fragment } from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import styled, { css } from "styled-components";

export type TableProps<T> = {
  name: string;
  data: T[];
  columns: ColumnDef<T>[];
  noDataMessage?: string;
  useMinHeight?: boolean;
};
export type TableRenderSubRowComponent<T> = (props: {
  row: Row<T>;
}) => React.ReactElement;

export function Table<T>(props: TableProps<T>) {
  const { useMinHeight = true, data, columns, noDataMessage } = props;
  const { getHeaderGroups, getRowModel } = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isNoData = getRowModel().rows.length === 0;

  return (
    <TableContainer>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="row head">
            {headerGroup.headers.map((header) =>
              header.isPlaceholder ? null : (
                <TableTh key={header.id} width={header.column.getSize()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableTh>
              )
            )}
          </tr>
        ))}
      </thead>
      <TableBody useMinHeight={useMinHeight}>
        {isNoData ? (
          <NoDataComponent useMinHeight={useMinHeight}>
            {noDataMessage}
          </NoDataComponent>
        ) : (
          getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr className="row body">
                {row.getVisibleCells().map((cell) => (
                  <TableTd key={cell.id} width={cell.column.getSize()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableTd>
                ))}
              </tr>
            </Fragment>
          ))
        )}
      </TableBody>
    </TableContainer>
  );
}

const TableContainer = styled.table`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .row {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid ${({ theme: { colors } }) => colors.secondary[400]};
  }
`;

const tableCellStyle = css`
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`;

const TableTh = styled.th<{ width: number }>`
  ${tableCellStyle}
  min-width: ${({ width }) => width}px;
  color: ${({ theme: { colors } }) => colors.secondary[900]};
`;

const TableTd = styled.td<{ width: number }>`
  ${tableCellStyle}
  min-width: ${({ width }) => width}px;
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;

const TableBody = styled.tbody<{ useMinHeight: boolean }>`
  min-height: ${({ useMinHeight }) => (useMinHeight ? "560px" : "auto")};
  display: flex;
  flex-direction: column;
`;

const NoDataComponent = styled.div<{ useMinHeight: boolean }>`
  width: 100%;
  height: ${({ useMinHeight }) => (useMinHeight ? "560px" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
