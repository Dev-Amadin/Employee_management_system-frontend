import { DEPARTMENT_OPTIONS } from "@/utils/appdata";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "@/utils/icons";
import { authFetch } from "./AuthService";

const EMPLOYEE_BASE_URL = `/employee`;

export function getAllEmployees(page: number, size: number) {
  return authFetch.get(EMPLOYEE_BASE_URL, {
    params: {
      page: page,
      size: size,
    },
  });
}

export function searchEmployees(
  page: number,
  size: number,
  searchValue: string,
) {
  return authFetch.get(`${EMPLOYEE_BASE_URL}/search`, {
    params: {
      page: page,
      size: size,
      searchValue: searchValue,
    },
  });
}

export function createEmployee(employee: Employee) {
  return authFetch.post(EMPLOYEE_BASE_URL, employee);
}

export function getEmployeeById(id: string) {
  return authFetch.get<Employee>(`${EMPLOYEE_BASE_URL}/${id}`);
}

export function updateEmployee(employeeId: string, employee: Employee) {
  return authFetch.patch<Employee>(`${EMPLOYEE_BASE_URL}/${employeeId}`, employee);
}

export function deleteEmployeeById(id: string) {
  return authFetch.delete(`${EMPLOYEE_BASE_URL}/${id}`);
}

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  managerId?: string;
  managerName?: string;
  department: string;
}

type EmployeeColumnsProps = {
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export const getColumns = ({
  onEdit,
  onDelete,
}: EmployeeColumnsProps): ColumnDef<Employee>[] => [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.original.department;
      return (
        DEPARTMENT_OPTIONS.find(
          (departmentOption) => departmentOption.value === department,
        )?.label ?? department
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 hover:bg-purple-accent/20 cursor-pointer"
              >
                <MoreHorizontalIcon />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="bg-light ring-0">
            <DropdownMenuItem
              className="hover:bg-purple-accent/10 cursor-pointer"
              onClick={() => onEdit(employee)}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-purple-accent/10 cursor-pointer text-danger"
              onClick={() => onDelete(employee)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
