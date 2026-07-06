import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  type Employee,
} from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "@/utils/icons";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import PageHeader from "./PageHeader";
import Btn from "./Btn";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalElements, setTotalElements] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    allEmployees();
  }, [pagination]);

  function allEmployees() {
    getAllEmployees(pagination.pageIndex, pagination.pageSize)
      .then((response) => {
        console.log("GET_ALL_RESPONSE:: ", response);
        setEmployees(response.data.content);
        setTotalElements(response.data.page.totalElements);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
      });
  }

  function addEmployee() {
    navigate("/employee/add");
  }

  function editEmployee(id?: string) {
    if (id) {
      navigate(`/employee/edit/${id}`);
    }
  }

  function deleteEmployee(id?: string) {
    if (id) {
      deleteEmployeeById(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          allEmployees();
        })
        .catch((error) => console.log("DELETE ERROR:: ", error));
    }
  }

  return (
    <>
      <PageHeader
        title="Employees"
        subheading="List of all employees"
        className="mb-6"
        button ={<Btn text="Add Employees" type="primary" />}
      />
      <DataTable
        columns={columns}
        data={employees}
        pagination={pagination}
        totalElements={totalElements}
        onPaginationChange={setPagination}
      />
    </>
  );
}



export const columns: ColumnDef<Employee>[] = [
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
    header: "Actions",
    id: "actions",
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
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="bg-slate-50 ring-0">
            <DropdownMenuItem
              className="hover:bg-purple-accent/10 cursor-pointer"
              onClick={() => {
                console.log(employee);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-accent/10 cursor-pointer text-danger">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
