import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  type Employee,
} from "../services/EmployeeService";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GroupIcon, MoreHorizontalIcon } from "@/utils/icons";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import PageHeader from "./PageHeader";
import Btn from "./Btn";
import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [openModal, setOpenModal] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [employee, setEmployee] = useState<Employee>();
  const [isEdit, setIsEdit] = useState(false);

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

  function handleAdd() {
    setIsEdit(false);
    setOpenModal(true);
  }

  function handleEdit(employee: Employee) {
    setIsEdit(true);
    setOpenModal(true);
    setEmployee(employee);
  }

  function handleDelete(employee: Employee) {
    if (employee.id) {
      deleteEmployeeById(employee.id)
        .then((response) => {
          console.log("DELETE:: ", response);
          allEmployees();
        })
        .catch((error) => console.log("DELETE ERROR:: ", error));
    }
  }

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <PageHeader
        title="Employees"
        subheading="List of all employees"
        className="mb-6"
        button={
          <Btn
            text="Add Employees"
            type="primary"
            onClick={() => {
              handleAdd();
            }}
          />
        }
        icon={<GroupIcon size="size-6" />}
      />
      <DataTable
        columns={columns}
        data={employees}
        pagination={pagination}
        totalElements={totalElements}
        onPaginationChange={setPagination}
      />
      <Modal
        size="sm:max-w-2xl"
        title={isEdit ? "Update Employee" : "Create Employee"}
        subtitle={
          isEdit
            ? "Fill all the necessary fields for employee update."
            : "Fill all the necessary fields for employee creation."
        }
        open={openModal}
        setOpen={setOpenModal}
        children={
          <EmployeeForm
            isEdit={isEdit}
            employee={employee}
            onCloseModal={() => {
              setOpenModal(false);
            }}
            onSuccess={() => allEmployees()}
          />
        }
        footer={false}
      />
    </>
  );
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

