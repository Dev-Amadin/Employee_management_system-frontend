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

export const SiderbarLinks = [
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
