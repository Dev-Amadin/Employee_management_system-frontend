import { AddUserIcon } from "@/utils/icons";
import PageHeader from "./PageHeader";
import Btn from "./Btn";
import { useEffect, useState } from "react";
import {
  deleteUserById,
  getAllusers,
  getUserColumns,
  type User,
} from "@/services/UserService";
import type { PaginationState } from "@tanstack/react-table";
import { PAGEABLE } from "@/utils/appdata";
import { DataTable } from "./DataTable";
import { toaster } from "@/utils/commons";
import Modal from "./Modal";
import DeleteConfirmation from "./DeleteConfirmation";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGEABLE.page,
    pageSize: PAGEABLE.size,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [user, setUser] = useState<User>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteSubject, setDeleteSubject] = useState("");

  useEffect(() => {
    allUsers();
  }, [pagination]);

  function allUsers() {
    setIsLoading(true);
    getAllusers(pagination.pageIndex, pagination.pageSize)
      .then((response) => {
        console.log("GET_ALL_RESPONSE:: ", response);
        setUsers(response.data.content);
        setTotalElements(response.data.page.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
        setIsLoading(false);
      });
  }

  function handleEdit(user: User) {
    setIsEdit(true);
    // setOpenModal(true);
    setUser(user);
  }

  function handleDelete(user: User) {
    if (user.id) {
      setDeleteId(user.id);
      setDeleteSubject(user.username);
    }
    setOpenDeleteModal(true);
  }

  function deleteUser(id:string, subject:string) {
    if (id) {
      deleteUserById(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          toaster(
            true,
            "User Deleted",
            `You have successfully deleted user ${subject}.`,
          );
          allUsers();
        })
        .catch((error) => {
          console.log("DELETE ERROR:: ", error);
          toaster(
            false,
            "Error Occured",
            `An error occured while trying to delete user ${subject}.`,
          );
        });
    }
  }

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <PageHeader
        title="Users"
        subheading="List of all Users"
        className="mb-6"
        button={
          <Btn
            text="Add Users"
            type="primary"
            // onClick={() => {
            //   handleAdd();
            // }}
          />
        }
        icon={<AddUserIcon size="size-6" />}
      />

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={users}
        pagination={pagination}
        totalElements={totalElements}
        onPaginationChange={setPagination}
      />

      <Modal
        size="sm:max-w-md"
        title="Delete User"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        children={
          <DeleteConfirmation
            deleteId={deleteId}
            subject={deleteSubject}
            onCancel={() => setOpenDeleteModal(false)}
            onDelete={(id,subject) => {
                deleteUser(id,subject);
                setOpenDeleteModal(false);
            }}
          />
        }
        footer={false}
      />
      
    </>
  );
}
