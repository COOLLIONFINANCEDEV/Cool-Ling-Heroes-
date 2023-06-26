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
import SelectAprAndDuration from "../Components/InvestCalculator/SelectAprAndDuration";
import FormatMoney from "../Helpers/FormatMoney";
import removeThousandsSeparator from "../Helpers/RemoveFormatMoney";
import NewsLetter from "../Components/Newsletter/NewsLetter";
import CreateModal from "../Components/Modal/CreateModal";
import { INVESTINNFORMATIONITEM } from "../Components/Investments/InvestmentInformtion";
import routes from "../Router/routes";
import Redirect from "../Helpers/Redirect";
import ApiSession from "../Service/ApiSession";
import { setAlert } from "../Toolkit/Alert/AlertSlice";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { OverViewContext } from "../Context/OverViewContext";

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
  investment?: any;
  handleInvestment?: Function;
  defaultValue?: { month: number | undefined; amount: number | undefined };
}
const Simulator: React.FC<SIMULATOR> = ({
  backgroundColorState = false,
  handleClick,
  investment = undefined,
  handleInvestment,
  defaultValue,
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
  const [amount, setAmount] = React.useState(defaultValue?.amount ?? 1000);
  const [newsLetter, setNewsLetter] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [month, setMonth] = React.useState(defaultValue?.month ?? 3);
  const [interet, setInteret] = React.useState(1);
  const [error, setError] = React.useState<Error>({
    state: false,
    content: "",
  });
  const minAmount = 200;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const OverViewContextValue = React.useContext(OverViewContext);

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

  React.useEffect(() => {
    const item = SimulatorData.filter((item) => item.status)[0];
    const interetPerMonth = item.interet / 12;
    const globalInteret = interetPerMonth * month;
    setInteret(globalInteret);
  }, [SimulatorData, month]);

  const handleInvest = async () => {
    if (handleClick && amount >= 200) {
      const element = SimulatorData.filter((item) => item.status === true)[0];
      const body = {
        amount: amount,
        term: month,
      };
      setLoader(true);
      if (!investment) {
        const response = await ApiSession.invest.create(body);
        if (response.error) {
          dispatch(setAlert({ state: "error", message: response.message }));
        } else {
          const newElement: INVESTINNFORMATIONITEM = {
            ...element,
            month: month,
            amount: amount,
            investmentId: response.data?.at(-1).id,
          };
          if (handleInvestment) handleInvestment(response.data?.at(-1));
          handleClick(newElement);
          OverViewContextValue?.handle(true);
          dispatch(setAlert({ state: "success", message: response.message }));
        }
      } else {
        const newElement: INVESTINNFORMATIONITEM = {
          ...element,
          month: month,
          amount: amount,
          investmentId: investment.id,
        };
        handleClick(newElement);
      }
      setLoader(false);
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
    if (!backgroundColorState) setNewsLetter((state) => state + 1);
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
            <Stack
              justifyContent={"space-between"}
              sx={{ width: "100%", flexDirection: { xs: "column", sm: "row" } }}
              rowGap={2}
            >
              <Typography
                fontWeight={"600"}
                sx={{ width: "max-content !important" }}
              >
                Annual Percentage Rate
              </Typography>
              <Typography fontWeight={"600"} color={"primary"}>
                {interet} %
              </Typography>
            </Stack>
            {/* <SelectDuration
              SimulatorData={SimulatorData}
              onChangeSimulatorStatus={handleChangeSimalatorStatus}
            /> */}
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
                defaultValue={defaultValue?.month ?? 3}
              />
            </Box>
          </Stack>

          {backgroundColorState ? (
            <LoadingButton
              color="primary"
              variant="contained"
              size="large"
              sx={{ display: { xs: "none", sm: "initial" } }}
              onClick={handleInvest}
              loadingPosition="center"
              loading={loader}
            >
              <Typography m={1} color={"secondary"}>
                Start Investing
              </Typography>
            </LoadingButton>
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
          alignItems={"flex-end"}
          rowGap={3}
        >
          <BarChart
            amount={amount}
            rule={SimulatorData.filter((item) => item.status === true)[0]}
            month={month}
          />

          {backgroundColorState ? (
            <LoadingButton
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
              loadingPosition="center"
              loading={loader}
            >
              <Typography m={1} color={"secondary"}>
                Start Investing
              </Typography>
            </LoadingButton>
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
      {newsLetter >= 4 && (
        <CreateModal makeOpen ModalContent={NewsLetter} closeButton />
      )}
    </Stack>
  );
};

export default Simulator;
