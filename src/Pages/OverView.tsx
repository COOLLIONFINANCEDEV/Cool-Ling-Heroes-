import { Box, Container } from "@mui/material";
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  GifIcon,
} from "@heroicons/react/24/solid";
import { formatNumberWithLeadingZero } from "../Helpers/FormatMoney";
import CardGroupes from "../Containers/CardGroupes";
import BlocTitle from "../Containers/BlocTitle";
import { CustomersSearch } from "../Components/CustomerSeach";
import TableCustomze from "../Containers/TableCustomze";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import { useSelector } from "react-redux";
import Roles from "../Seeds/Roles";
import React from "react";
import CreateModal from "../Components/Modal/CreateModal";
import Investments from "../Components/Investments/Investments";

const Info = {
  card: [
    {
      title: "Number of investments",
      value: formatNumberWithLeadingZero(),
      Icon: <ArrowTrendingUpIcon />,
      color: "primary.main",
    },
    {
      title: "Total investment amount",
      value: formatNumberWithLeadingZero(),
      Icon: <CurrencyDollarIcon />,
      color: "warning.main",
    },
    {
      title: "Total interest-free investment",
      value: formatNumberWithLeadingZero(),
      Icon: <BanknotesIcon />,
      color: "info.main",
    },
    {
      title: "total interest of all",
      value: formatNumberWithLeadingZero(),
      Icon: <GifIcon />,
      color: "error.main",
    },
  ],
};
export interface OVERVIEWCONTEXT {
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const OverViewContext = React.createContext<OVERVIEWCONTEXT | undefined>(
  undefined
);

const OverView = () => {
  const [Loader, setLoader] = React.useState(false);
  const [investState, setInvestState] = React.useState(false);
  const { user } = useSelector(selectLogin);
  const title = ["Manage Your Investments", "All Investments"];

  const handleInvestment = () => {
    setInvestState(true);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <OverViewContext.Provider value={{ state: Loader, handle: setLoader }}>
        <Container maxWidth="xl">
          <BlocTitle
            title={user.role !== Roles.lender ? title[1] : title[0]}
            buttonContent={"invest now"}
            disabled={user.role !== Roles.lender}
            handleClick={handleInvestment}
          />
          <CardGroupes CardItemInfo={Info.card} />
          <CustomersSearch />
          <TableCustomze />
        </Container>
        {investState && (
          <CreateModal
            makeOpen
            ModalContent={Investments}
            closeButton
            closeButtonFunc={() => setInvestState(false)}
            style={{ borderRadius: "0px" }}
          />
        )}
      </OverViewContext.Provider>
    </Box>
  );
};

export default OverView;
