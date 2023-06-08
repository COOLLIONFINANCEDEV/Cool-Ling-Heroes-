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

const LenderInfo = {
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

const OverView = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <BlocTitle
          title="Manage Your Investments"
          buttonContent={"invest now"}
        />
        <CardGroupes CardItemInfo={LenderInfo.card} />
        <CustomersSearch />
        <TableCustomze />
      </Container>
    </Box>
  );
};

export default OverView;
