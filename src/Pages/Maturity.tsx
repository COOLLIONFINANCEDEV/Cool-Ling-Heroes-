import { Box, Container } from "@mui/material";
import {
  ArrowTrendingUpIcon,
  WrenchIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { formatNumberWithLeadingZero } from "../Helpers/FormatMoney";
import BlocTitle from "../Containers/BlocTitle";
import React from "react";
import { MaturityContext } from "../Context/MaturityContext";
import CardGroupes from "../Containers/CardGroupes";
import MaturityTable from "../Containers/MaturityTable";
import ApiSession from "../Service/ApiSession";
import { CheckCircle } from "@mui/icons-material";
import { countObjectsWithProperty } from "../Helpers/countObjectWithProperty";
import { countObjectsWithinCurrentMonth, countObjectsWithinCurrentWeek } from "../Helpers/countObjectWithInCurrentWeek";
const Maturity = () => {
  const [Loader, setLoader] = React.useState(true);
  const [information, setInformation] = React.useState([]);
  const [card, setCard] = React.useState([
    {
      title: "Total investments",
      value: formatNumberWithLeadingZero(),
      Icon: <ArrowTrendingUpIcon />,
      color: "primary.main",
      state: Loader,
    },
    {
      title: "maturity date available",
      value: formatNumberWithLeadingZero(),
      Icon: <CheckCircle />,
      color: "warning.main",
      state: Loader,
    },
    {
      title: "maturity date unavailable.",
      value: formatNumberWithLeadingZero(),
      Icon: <WrenchIcon />,
      color: "info.main",
      state: Loader,
    },
    {
      title: "repayment this week",
      value: formatNumberWithLeadingZero(),
      Icon: <CalendarIcon />,
      color: "error.main",
      state: Loader,
    },
  ]);

  const getInformation = React.useCallback(async () => {
    const response = await ApiSession.invest.list(1);
    if (!response.error) setInformation(response.data);
    setLoader(false);
  }, []);

  React.useEffect(() => {
    getInformation();
  }, [getInformation]);

  React.useEffect(() => {
    if (information?.length >= 1) {
      setCard([
        {
          title: "Total investments",
          value: formatNumberWithLeadingZero(information.length),
          Icon: <ArrowTrendingUpIcon />,
          color: "primary.main",
          state: Loader,
        },
        {
          title: "maturity date available",
          value: formatNumberWithLeadingZero(
            countObjectsWithProperty(information, "date_of_refund")
          ),
          Icon: <CheckCircle />,
          color: "warning.main",
          state: Loader,
        },
        {
          title: "repayment this month",
          value: formatNumberWithLeadingZero(
            countObjectsWithinCurrentMonth(information, "date_of_refund")
          ),
          Icon: <WrenchIcon />,
          color: "info.main",
          state: Loader,
        },
        {
          title: "repayment this week",
          value: formatNumberWithLeadingZero(
            countObjectsWithinCurrentWeek(information, "date_of_refund")
          ),
          Icon: <CalendarIcon />,
          color: "error.main",
          state: Loader,
        },
      ]);
    }
  }, [Loader, information]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <MaturityContext.Provider
        value={{
          state: Loader,
          handle: setLoader,
          information: setInformation,
        }}
      >
        <Container maxWidth="xl">
          <BlocTitle
            title={"Maturity Date"}
            buttonContent={"invest now"}
            disabled
          />
          <CardGroupes CardItemInfo={card} />
          <MaturityTable information={information} />
        </Container>
      </MaturityContext.Provider>
    </Box>
  );
};

export default Maturity;
