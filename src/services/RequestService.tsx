import { formatDate } from "@/utils/commons";
import type { ColumnDef } from "@tanstack/react-table";

export interface LeaveRequest {
  id?: string;
  type: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  reason: string;
  status: string;
}

export const getLeaveRequestCols = (): ColumnDef<LeaveRequest>[] => [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;

      return(
        <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Days",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
