import { BASE_URL } from "@/utils/appdata";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "@/utils/icons";

const USER_BASE_URL = `${BASE_URL}/users`;

export function getAllusers(page: number, size: number) {
  return axios.get(USER_BASE_URL, {
    params: {
      page: page,
      size: size,
    },
  });
}

export function createUser(user: User) {
  return axios.post(USER_BASE_URL, user);
}

export function getUserById(id: string) {
  return axios.get<User>(`${USER_BASE_URL}/${id}`);
}

export function updateUser(userId: string, user: User) {
  return axios.patch<User>(`${USER_BASE_URL}/${userId}`, user);
}

export function activateUser(userId: string) {
  return axios.patch<User>(`${USER_BASE_URL}/activate/${userId}`);
}

export function deactivateUser(userId: string) {
  return axios.patch<User>(`${USER_BASE_URL}/deactivate/${userId}`);
}

export function deleteUserById(id: string) {
  return axios.delete(`${USER_BASE_URL}/${id}`);
}

export interface User {
  id?: string;
  username: string;
  password: string;
  employeeId: string;
  employeeName: string;
  role: string;
  isActive: boolean;
}

type UserColumnsProps = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const getUserColumns = ({
  onEdit,
  onDelete,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
    {
    accessorKey: "isActive",
    header: "status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => onEdit(user)}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-purple-accent/10 cursor-pointer text-danger"
              onClick={() => onDelete(user)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
