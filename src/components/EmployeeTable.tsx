import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  getColumns,
  type Employee,
} from "../services/EmployeeService";
import { DataTable } from "./DataTable";
import { GroupIcon } from "@/utils/icons";
import type { PaginationState } from "@tanstack/react-table";
import PageHeader from "./PageHeader";
import Btn from "./Btn";
import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";
import { toaster } from "@/utils/commons";
import DeleteConfirmation from "./DeleteConfirmation";
import { PAGEABLE } from "@/utils/appdata";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGEABLE.page,
    pageSize: PAGEABLE.size,
  });
  const [openModal, setOpenModal] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [employee, setEmployee] = useState<Employee>();
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteSubject, setDeleteSubject] = useState("");

  useEffect(() => {
    allEmployees();
  }, [pagination]);

  function allEmployees() {
    setIsLoading(true);
    getAllEmployees(pagination.pageIndex, pagination.pageSize)
      .then((response) => {
        console.log("GET_ALL_RESPONSE:: ", response);
        setEmployees(response.data.content);
        setTotalElements(response.data.page.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
        setIsLoading(false);
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
    setOpenDeleteModal(true);
    if (employee.id) {
      setDeleteId(employee.id);
      setDeleteSubject(`${employee.firstName} ${employee.lastName}`);
    }
  }

  function deleteEmployee(id: string, subject: string) {
    if (id) {
      deleteEmployeeById(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          toaster(
            true,
            "Employee Deleted",
            `You have successfully deleted employee ${subject}.`,
          );
          allEmployees();
        })
        .catch((error) => {
          console.log("DELETE ERROR:: ", error);
          toaster(
            false,
            "Error Occured",
            `An error occured while trying to delete employee ${subject}`,
          );
        });
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
        isLoading={isLoading}
        columns={columns}
        data={employees}
        pagination={pagination}
        totalElements={totalElements}
        onPaginationChange={setPagination}
      />
      <Modal
        size="sm:max-w-2xl"
        title={isEdit ? "Update Employee" : "Create Employee"}
        subtitle={`Fill all the necessary fields for employee ${isEdit? 'update.':'creation.'}`}
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
      <Modal
        size="sm:max-w-md"
        title="Delete Employee"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        children={
          <DeleteConfirmation
            deleteId={deleteId}
            subject={deleteSubject}
            onCancel={() => setOpenDeleteModal(false)}
            onDelete={(id, subject) => {
              deleteEmployee(id, subject);
              setOpenDeleteModal(false);
            }}
          />
        }
        footer={false}
      />
    </>
  );
}
