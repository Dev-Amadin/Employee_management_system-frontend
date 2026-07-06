import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type OnChangeFn,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PageSizeOptions = [10, 25, 50, 100];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  totalElements: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPaginationChange,
  totalElements,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: Math.ceil(totalElements / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden shadow-xl p-6 rounded-md border-b">
      <Table className="border-separate border-spacing-y-0.5">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-purple-accent/10"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}  className="first:rounded-l-md last:rounded-r-md">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between py-4 mt-6">
        <div className="flex items-center">
          <p className="text-xs font-semibold">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
        </div>

        <div className="flex items-center justify-end space-x-2 ">
          <div className="flex items-center justify-between gap-4">
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="select-rows-per-page">
                Rows per page
              </FieldLabel>
              <Select
                value={pagination.pageSize}
                onValueChange={(e) => {
                  onPaginationChange({
                    pageIndex: 0,
                    pageSize: Number(e),
                  });
                }}
              >
                <SelectTrigger className="w-20" id="select-rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start" className="bg-slate-50 ring-0">
                  <SelectGroup>
                    {PageSizeOptions.map((size, index) => (
                      <SelectItem
                        key={index}
                        className="hover:bg-purple-accent/10 cursor-pointer"
                        value={size}
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => table.previousPage()}
                    className={`cursor-pointer ${!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive className="pointer-events-none">
                   {pagination.pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => table.nextPage()}
                      className={`cursor-pointer ${!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}`} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
