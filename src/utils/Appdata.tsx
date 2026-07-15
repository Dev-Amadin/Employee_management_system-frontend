import {
  AddUserIcon,
  AnalyticIcon,
  ApprovalIcon,
  CalendarIcon,
  GroupIcon,
  HomeIcon,
  RequestIcon,
  VibratingBellIcon,
} from "./icons";

export const SIDERBAR_LINKS = [
  {
    title: "Home",
    links: [
      {
        link: "dashboard",
        name: "dashboard",
        icon: <HomeIcon size="size-4" />,
      },
    ],
  },
  {
    title: "Pages",
    links: [
      {
        link: "leave-request",
        name: "Leave Requests",
        icon: <RequestIcon size="size-4" />,
      },
      {
        link: "team-calendar",
        name: "Team Calendar",
        icon: <CalendarIcon size="size-4" />,
      },
      {
        link: "approvals",
        name: "Approvals",
        icon: <ApprovalIcon size="size-4" />,
      },
      {
        link: "analytics",
        name: "Analytics",
        icon: <AnalyticIcon size="size-4" />,
      },
      {
        link: "notification",
        name: "Notifications",
        icon: <VibratingBellIcon size="size-4" />,
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        link: "users",
        name: "Users",
        icon: <AddUserIcon size="size-4" />,
      },
      {
        link: "employees",
        name: "Employees",
        icon: <GroupIcon size="size-4" />,
      },
    ],
  },
];

export const DEPARTMENTS = [
  {
    name: "IT",
    value: "IT",
  },
  {
    name: "Engineering",
    value: "ENGR",
  },
  {
    name: "Administrative",
    value: "ADMIN",
  },
  {
    name: "Finance",
    value: "FIN",
  },
];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
  label: department.name,
  value: department.value,
}));

export const ROLES = [
  {
    name: "Admin",
    value: "ADMIN",
  },
  {
    name: "Staff",
    value: "STAFF",
  },
  {
    name: "Manager",
    value: "MANAGER",
  },
];

export const ROLES_OPTIONS = ROLES.map((role) => ({
  label: role.name,
  value: role.value,
}));

export const PAGEABLE = {
  page: 0,
  size: 5,
};

export const BASE_URL = "http://localhost:8080/api/dev/ems";

export type Page = {
  size: number;
  number: number;
  totalElements?: number;
  totalPages?: number;
};
