import { AddUserIcon } from "@/utils/icons";
import PageHeader from "./PageHeader";
import Btn from "./Btn";
import { useEffect, useState } from "react";
import {
  activateUser,
  deactivateUser,
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
import UserForm from "./UserForm";
import StatusChangeConfirmation from "./statusChangeConfirmation";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGEABLE.page,
    pageSize: PAGEABLE.size,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [user, setUser] = useState<User>();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
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

  function handleAdd() {
    setIsEdit(false);
    setOpenModal(true);
  }

  function handleEdit(user: User) {
    setIsEdit(true);
    setOpenModal(true);
    setUser(user);
  }

  function handleDelete(user: User) {
    if (user.id) {
      setDeleteId(user.id);
      setDeleteSubject(user.username);
    }
    setOpenDeleteModal(true);
  }

  function handleStatusChange(user: User) {
    setUser(user);
    setOpenStatusModal(true);
  }



  function deleteUser(id: string, subject: string) {
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

  function handleActiveUser(id: string, subject: string) {
    if (id) {
      activateUser(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          toaster(
            true,
            "User Activated",
            `You have successfully activated user ${subject}.`,
          );
          allUsers();
        })
        .catch((error) => {
          console.log("DELETE ERROR:: ", error);
          toaster(
            false,
            "Error Occured",
            `An error occured while trying to activated user ${subject}.`,
          );
        });
    }
  }

  function handleDectiveUser(id: string, subject: string) {
    if (id) {
      deactivateUser(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          toaster(
            true,
            "User deactivated",
            `You have successfully deactivated user ${subject}.`,
          );
          allUsers();
        })
        .catch((error) => {
          console.log("DELETE ERROR:: ", error);
          toaster(
            false,
            "Error Occured",
            `An error occured while trying to deactivated user ${subject}.`,
          );
        });
    }
  }

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onStatusChange: handleStatusChange,
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
            onClick={() => {
              handleAdd();
            }}
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
        size="sm:max-w-2xl"
        title={isEdit ? "Update User" : "Create User"}
        subtitle={`Fill all the necessary fields for employee ${isEdit ? "update." : "creation."}`}
        open={openModal}
        setOpen={setOpenModal}
        children={
          <UserForm
            isEdit={isEdit}
            user={user}
            onCloseModal={() => {
              setOpenModal(false);
            }}
            onSuccess={() => allUsers()}
          />
        }
        footer={false}
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
            onDelete={(id, subject) => {
              deleteUser(id, subject);
              setOpenDeleteModal(false);
            }}
          />
        }
        footer={false}
      />

      <Modal
        size="sm:max-w-md"
        title={`${user?.isActive ? "Deactivate" : "Activate"} User`}
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        children={
          <StatusChangeConfirmation
            status={user?.isActive || false}
            subject={user?.username || ""}
            userId={user?.id || ""}
            onStatusChange={(id,subject)=>{ 
                user?.isActive ? handleDectiveUser(id,subject) : handleActiveUser(id,subject);
                setOpenStatusModal(false);
            }}
            onCancel={() => setOpenStatusModal(false)}
          />
        }
        footer={false}
      />
    </>
  );
}
