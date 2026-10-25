import type { ColumnDef } from "@tanstack/react-table";

export interface LeaveRequest {
  id?: string;
  type: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  status: string;
}

export const getLeaveRequestCols = ():ColumnDef<LeaveRequest>[] => [
    {
    accessorKey: "employeeName",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];