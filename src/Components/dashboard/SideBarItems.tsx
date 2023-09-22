import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  FolderPlusIcon,
  ShoppingCartIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { SvgIcon } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import routes from "../../Router/routes";
import Roles from "../../Seeds/Roles";
import { selectLogin } from "../../Toolkit/Login/LoginSlice";

type NAVBARITEMSCONFIG = Array<{
  title: string;
  path: string;
  icon: ReactNode;
  disabled?: boolean;
  external?: boolean;
}>;

const allUser = ['overview', 'account', 'settings'];
const donatorActiveList = [...allUser];
const adminActiveList = [...allUser, 'customers', 'maturity'];
const applicantActiveList = [...allUser];

const ActiveList = {
  [Roles.donor]: donatorActiveList,
  [Roles.admin]: adminActiveList,
  [Roles.applicant]: applicantActiveList,
};
const List: NAVBARITEMSCONFIG = [
  {
    title: 'Overview',
    path: routes.home + routes.dashboard,
    icon: (
      <SvgIcon fontSize='small'>
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
    path: routes.donor,
    icon: (
      <SvgIcon fontSize="small">
        <FolderPlusIcon  />
      </SvgIcon>
    ),
  },
  {
    title: "Beneficiary",
    path: routes.beneficiary,
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
