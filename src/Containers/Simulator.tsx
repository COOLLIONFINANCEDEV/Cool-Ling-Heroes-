import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { width } from "../Theme/size";
import BarChart from "../Components/Chart/BarChart";
import SelectInteret from "../Components/InvestCalculator/SelectInteret";
import SelectDuration from "../Components/InvestCalculator/SelectDuration";
import SelectAprAndDuration from "../Components/InvestCalculator/SelectAprAndDuration";
import FormatMoney from "../Helpers/FormatMoney";
import removeThousandsSeparator from "../Helpers/RemoveFormatMoney";
import NewsLetter from "../Components/Newsletter/NewsLetter";
import CreateModal from "../Components/Modal/CreateModal";

export type SimulatorData = Array<SimulatorItem>;
export type SimulatorItem = {
  month: number;
  interet: number;
  status: boolean;
};
type Error = {
  state: boolean;
  content?: string;
};
const Simulator = () => {
  const [SimulatorData, setSimulatorData] = React.useState<SimulatorData>([
    {
      month: 3,
      interet: 3.5,
      status: false,
    },
    {
      month: 6,
      interet: 5,
      status: true,
    },
    {
      month: 9,
      interet: 5.5,
      status: false,
    },
    {
      month: 12,
      interet: 7,
      status: false,
    },
    {
      month: 19,
      interet: 8,
      status: false,
    },
  ]);
  const [amount, setAmount] = React.useState(1000);
  const [newsLetter, setNewsLetter] = React.useState(0);
  const [error, setError] = React.useState<Error>({
    state: false,
    content: "",
  });
  const minAmount = 200;
  const { palette } = useTheme();

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const content = removeThousandsSeparator(event.target.value);
    const value = content ? content : 0;
    setAmount(value);
    if (value < minAmount) {
      setError({
        state: true,
        content: "please enter a minimum amount of 200 dollars",
      });
    } else {
      setError({ state: false });
    }
  };

  const handleChangeSimalatorStatus = React.useCallback(
    (search: number, state: boolean) => {
      const newData: SimulatorData = [];
      SimulatorData.forEach((item: SimulatorItem, key) => {
        const newObject: SimulatorItem = {
          ...item,
          status:
            item.month === search || item.interet === search ? true : false,
        };
        newData.push(newObject);
      });
      setSimulatorData(newData);
      setNewsLetter((state) => state + 1);
    },
    [SimulatorData]
  );

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background:
          "linear-gradient(171deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Stack
        sx={{ width: width, flexDirection: { xs: "column", sm: "row" } }}
        rowGap={5}
      >
        {/* first bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" },
            margin: { xs: "auto", sm: "auto 20px auto auto" },
          }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={5}
        >
          <Typography variant="h4" color={"primary"} fontWeight={600}>
            Invest in real estate and make your money grow
          </Typography>

          <Stack
            justifyContent={"space-between"}
            sx={{ width: "100%", flexDirection: { xs: "column", sm: "row" } }}
            rowGap={2}
          >
            <Typography fontWeight={"600"}>Investment amount</Typography>
            <FormControl
              sx={{
                width: { xs: "100%", sm: "100%" },
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <OutlinedInput
                id="outlined-adornment-amount"
                value={FormatMoney(amount)}
                onChange={handleChangeAmount}
                error={error.state}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                type="text"
                size="small"
                sx={{ width: { xs: "100%", sm: "150px" } }}
              />
              <FormHelperText
                sx={{
                  color: palette.error.main,
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
                }}
              >
                {error.content}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "flex", sm: "none !important" },
            }}
          >
            <Typography fontWeight={"600"}>APR & Duration</Typography>
            <SelectAprAndDuration
              SimulatorData={SimulatorData}
              onChangeSimulatorStatus={handleChangeSimalatorStatus}
            />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography fontWeight={"600"}>Duration</Typography>
            <SelectDuration
              SimulatorData={SimulatorData}
              onChangeSimulatorStatus={handleChangeSimalatorStatus}
            />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography fontWeight={"600"}>Annual Percentage Rate</Typography>
            <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
              <SelectInteret
                SimulatorData={SimulatorData}
                onChangeSimulatorStatus={handleChangeSimalatorStatus}
              />
            </Box>
          </Stack>

          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{ display: { xs: "none", sm: "initial" } }}
          >
            <Typography m={1} color={"secondary"}>
              Start Investing
            </Typography>
          </Button>
        </Stack>

        {/* second bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" },
            overflow: "hidden",
            borderRadius: "15px",
          }}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          rowGap={3}
        >
          <BarChart
            amount={amount}
            rule={SimulatorData.filter((item) => item.status === true)[0]}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{
              display: { xs: "initial", sm: "none" },
              width: "80%",
              margin: "auto",
              mb: 3,
            }}
            fullWidth
          >
            <Typography m={1} color={"secondary"}>
              Start Investing
            </Typography>
          </Button>
        </Stack>
      </Stack>
      {newsLetter >= 2 && <CreateModal makeOpen ModalContent={NewsLetter}/>}
    </Stack>
  );
};

export default Simulator;
