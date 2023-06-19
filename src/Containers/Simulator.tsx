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
import { INVESTINNFORMATIONITEM } from "../Components/Investments/InvestmentInformtion";
import routes from "../Router/routes";
import Redirect from "../Helpers/Redirect";

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
interface SIMULATOR {
  backgroundColorState?: boolean;
  handleClick?: Function;
}
const Simulator: React.FC<SIMULATOR> = ({
  backgroundColorState = false,
  handleClick,
}) => {
  const [SimulatorData, setSimulatorData] = React.useState<SimulatorData>([
    {
      month: 5,
      interet: 4,
      status: true,
    },
    {
      month: 17,
      interet: 5,
      status: false,
    },
    {
      month: 36,
      interet: 5.5,
      status: false,
    },
  ]);
  const [amount, setAmount] = React.useState(1000);
  const [newsLetter, setNewsLetter] = React.useState(0);
  const [month, setMonth] = React.useState(3);
  const [error, setError] = React.useState<Error>({
    state: false,
    content: "",
  });
  const minAmount = 200;
  const { palette } = useTheme();

  const handleChange = React.useCallback(
    (month: number) => {
      const newData: SimulatorData = [];
      SimulatorData.forEach((item: SimulatorItem, key) => {
        const newObject: SimulatorItem = {
          ...item,
          status: item.month === month ? true : false,
        };
        newData.push(newObject);
      });
      setSimulatorData(newData);
    },
    [SimulatorData]
  );

  const handleInvest = () => {
    if (handleClick && amount >= 200) {
      const element = SimulatorData.filter((item) => item.status === true)[0];
      const newElement: INVESTINNFORMATIONITEM = {
        ...element,
        month: month,
        amount: amount,
      };
      handleClick(newElement);
    }
  };

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
    (type: "month" | "interet", value: number) => {
      if (type === "month") {
        setMonth(value);
        if (value <= 5) {
          handleChange(5);
        } else if (value >= 6 && value <= 17) {
          handleChange(17);
        } else if (value >= 18 && value <= 36) {
          handleChange(36);
        }
      } else if (type === "interet") {
        handleChange(value);
      }
      if (!backgroundColorState) setNewsLetter((state) => state + 1);
    },
    [backgroundColorState, handleChange]
  );

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background: backgroundColorState
          ? "initial"
          : "linear-gradient(145deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)",
        m: backgroundColorState ? "auto 20px" : "auto",
      }}
      pt={backgroundColorState ? 5 : 15}
      id="simulator"
    >
      <Stack
        sx={{
          width: backgroundColorState ? "100%" : width,
          flexDirection: { xs: "column", sm: "row" },
        }}
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
            <Typography
              fontWeight={"600"}
              sx={{ width: "max-content !important" }}
            >
              Investment amount
            </Typography>
            <FormControl
              sx={{
                width: { xs: "100%", sm: "60%" },
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
                  bottom: "-50%",
                  m: 0,
                  p: 0,
                }}
              >
                {error.content}
              </FormHelperText>
            </FormControl>
          </Stack>

          {/* select apr */}
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: "none",
            }}
          >
            <Typography fontWeight={"600"}>APR & Duration</Typography>
            <SelectAprAndDuration
              SimulatorData={SimulatorData}
              onChangeSimulatorStatus={handleChangeSimalatorStatus}
            />
          </Stack>

          {/* select duration */}
          <Stack
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Typography fontWeight={"600"}>Percentage Rate</Typography>
            <SelectDuration
              SimulatorData={SimulatorData}
              onChangeSimulatorStatus={handleChangeSimalatorStatus}
            />
          </Stack>
          {/* select interet */}
          <Stack
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={"600"}>Duration</Typography>
              <Typography fontWeight={"600"} color={"primary"}>
                {month} Months
              </Typography>
            </Stack>
            <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
              <SelectInteret
                SimulatorData={SimulatorData}
                onChangeSimulatorStatus={handleChangeSimalatorStatus}
              />
            </Box>
          </Stack>

          {backgroundColorState ? (
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ display: { xs: "none", sm: "initial" } }}
              onClick={handleInvest}
            >
              <Typography m={1} color={"secondary"}>
                Start Investing
              </Typography>
            </Button>
          ) : (
            <Redirect link={routes.login}>
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
            </Redirect>
          )}
        </Stack>

        {/* second bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" },
            overflow: "hidden",
            borderRadius: "15px",
          }}
          justifyContent={"flex-end"}
          alignItems={"center"}
          rowGap={3}
        >
          <BarChart
            amount={amount}
            rule={SimulatorData.filter((item) => item.status === true)[0]}
            month={month}
          />

          {backgroundColorState ? (
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleInvest}
              sx={{
                display: { xs: "initial", sm: "none" },
                width: "80%",
                margin: "auto",
                mb: 3,
              }}
              fullWidth
              LinkComponent={backgroundColorState ? undefined : "a"}
              href={backgroundColorState ? undefined : routes.login}
            >
              <Typography m={1} color={"secondary"}>
                Start Investing
              </Typography>
            </Button>
          ) : (
            <Redirect link={routes.login}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                sx={{
                  display: { xs: "initial", sm: "none" },
                  width: "100%",
                  margin: "auto",
                  mb: 3,
                }}
                fullWidth
              >
                <Typography m={1} color={"secondary"}>
                  Start Investing
                </Typography>
              </Button>
            </Redirect>
          )}
        </Stack>
      </Stack>
      {newsLetter >= 2 && (
        <CreateModal makeOpen ModalContent={NewsLetter} closeButton />
      )}
    </Stack>
  );
};

export default Simulator;
