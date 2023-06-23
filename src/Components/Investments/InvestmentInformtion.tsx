import {
  Box,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { SimulatorItem } from "../../Containers/Simulator";
import FormatDateWithMonth from "../../Helpers/FormatDateWithMonth";
import FormatMoney from "../../Helpers/FormatMoney";

export interface INVESTINNFORMATIONITEM extends SimulatorItem {
  amount: number;
  investmentId: number;
}

interface INVESTMENTINFORMATION {
  interetInformation: INVESTINNFORMATIONITEM | undefined;
}

const InvestmentInformtion: React.FC<INVESTMENTINFORMATION> = ({
  interetInformation,
}) => {
  const amountWithPercentage = interetInformation
    ? interetInformation.amount +
      interetInformation?.amount * (interetInformation?.interet / 100)
    : 0;
  const amountInteret = interetInformation
    ? amountWithPercentage - interetInformation.amount
    : 0;
  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        fontWeight={500}
        sx={{
          mb: 2,
          fontSize: "1.9rem",
          width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
          p: { xs: "10px", sm: "50px" },
        }}
      >
        Review and confirm your investment
      </Typography>
      <Paper
        elevation={1}
        sx={{
          width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
          minHeight: "50vh",
          p: { xs: "10px", sm: "50px" },
        }}
      >
        <Typography variant="h5" fontWeight={500} fontSize={"1.5rem"}>
          Investment details
        </Typography>
        <Divider sx={{ fontWeight: 500, mb: 5 }} />
        <List>
          <Row
            title="Investment term"
            value={interetInformation?.month + " months"}
          />
          <Row
            title="Investment amount"
            value={interetInformation?.amount + " $"}
          />
          <Row
            title="Maturity date"
            value={FormatDateWithMonth(interetInformation?.month ?? 0)}
          />
          <Row
            title="Base APY"
            value={interetInformation?.interet + " %" ?? 0}
          />
          <Row title="Earnings" value={FormatMoney(amountInteret) + " $"} />
        </List>
        <Row
          title="Total Return"
          value={FormatMoney(amountWithPercentage) + " $"}
          dark
        />
      </Paper>
    </Box>
  );
};

interface ROW {
  title: string;
  value: string;
  dark?: boolean;
}
const Row: React.FC<ROW> = ({ title, value, dark = false }) => {
  return (
    <ListItem sx={{ width: "100%" }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            fontWeight: dark ? 800 : "inital",
            fontSize: dark ? "1.6rem" : "intial",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: dark ? 800 : "inital",
            fontSize: dark ? "1.6rem" : "intial",
          }}
        >
          {value}
        </Typography>
      </Stack>
    </ListItem>
  );
};
export default InvestmentInformtion;
