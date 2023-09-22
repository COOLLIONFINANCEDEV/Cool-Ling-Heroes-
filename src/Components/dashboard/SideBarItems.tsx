import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { SvgIcon } from "@mui/material";
import { ReactNode } from "react";
import routes from "../../Router/routes";
import Roles from "../../Seeds/Roles";
import { useSelector } from "react-redux";
import { selectLogin } from "../../Toolkit/Login/LoginSlice";
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  GifIcon,
  ShoppingCartIcon,
  FolderPlusIcon ,
  BellIcon ,
  TruckIcon ,
  UserGroupIcon ,
} from "@heroicons/react/24/solid";

type NAVBARITEMSCONFIG = Array<{
  title: string;
  path: string;
  icon: ReactNode;
  disabled?: boolean;
  external?: boolean;
}>;

const allUser = [ "account", "settings"];
const lenderActiveList = [...allUser];
const adminActiveList = [...allUser, "donors", "beneficiary","stocks", "requests"];
const moderatorActiveList = [...allUser];
const advisorActiveList = [...allUser];

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
    title: "Stocks",
    path: routes.product,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Donors",
    path: routes.donateur,
    icon: (
      <SvgIcon fontSize="small">
        <FolderPlusIcon  />
      </SvgIcon>
    ),
  },
  {
    title: "Beneficiary",
    path: routes.beneficiare,
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon  />
      </SvgIcon>
    ),
  },
  {
    title: "Requests",
    path: routes.request,
    icon: (
      <SvgIcon fontSize="small">
        <BellIcon   />
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
    title: "Messenger",
    path: routes.messenger,
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterTextIcon />
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
