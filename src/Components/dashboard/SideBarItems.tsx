import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { SvgIcon } from "@mui/material";
import { ReactNode } from "react";
import routes from "../../Router/routes";
import Roles from "../../Seeds/Roles";
import { useSelector } from "react-redux";
import { selectLogin } from "../../Toolkit/Login/LoginSlice";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

type NAVBARITEMSCONFIG = Array<{
  title: string;
  path: string;
  icon: ReactNode;
  disabled?: boolean;
  external?: boolean;
}>;

const lenderActiveList = ["overview", "account", "settings"];
const adminActiveList = ["overview", "account", "settings", "customers",'maturity'];
const moderatorActiveList = ["overview", "account", "settings"];
const advisorActiveList = ["overview", "account", "settings"];

const ActiveList = {
  [Roles.lender]: lenderActiveList,
  [Roles.admin]: adminActiveList,
  [Roles.moderator]: moderatorActiveList,
  [Roles.advisor]: advisorActiveList,
};
const List: NAVBARITEMSCONFIG = [
  {
    title: "Overview",
    path: routes.home + routes.dashboard,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Maturity",
    path: routes.maturity,
    icon: (
      <SvgIcon fontSize="small">
        <CalendarDaysIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: routes.customers,
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: routes.account,
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: routes.setting,
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];

const SideBarItems = (): NAVBARITEMSCONFIG => {
  const { user } = useSelector(selectLogin);
  const key = Object.keys(ActiveList).filter((item) => item === user.role);
  const map = ActiveList[key[0]];
  return List.filter((item) => map.includes(item.title.toLowerCase()));
};

export default SideBarItems;
