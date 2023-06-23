import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import CustomizedSteppers from "../CutomzedSteppers";
import Simulator from "../../Containers/Simulator";
import Payments from "../Payments/Payments";
import InvestmentInformtion, {
  INVESTINNFORMATIONITEM,
} from "./InvestmentInformtion";
import ApiSession from "../../Service/ApiSession";
import { useDispatch } from "react-redux";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { LoadingButton } from "@mui/lab";
import { OverViewContext } from "../../Context/OverViewContext";

interface INVESTMENTS {
  handleClose: any;
  investmentInfo: any;
  stepper: number;
}

const Investments: React.FC<INVESTMENTS> = ({
  handleClose,
  investmentInfo,
  stepper = 0,
}) => {
  const [step, setStep] = React.useState(stepper);
  const [interetInformation, setInteretInformation] = React.useState<
    INVESTINNFORMATIONITEM | undefined
  >();
  const [paymentInformation, setPaymentInformation] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [submit, setSumbit] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [investment, setInvestment] = React.useState<any>(investmentInfo);
  const [isChange, setIsChange] = React.useState(false);

  const dispatch = useDispatch();
  const OverViewContextValue = React.useContext(OverViewContext);
  const handleLoader = OverViewContextValue
    ? OverViewContextValue.handle
    : () => {};
  const handleInvest = async () => {
    setLoader(true);
    if (interetInformation) {
      const body = {
        amount: interetInformation.amount,
        term: interetInformation.month,
        proof: paymentInformation,
        investmentId: interetInformation.investmentId,
      };
      const response = await ApiSession.invest.create(body);
      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
        handleLoader(true);
      }
      handleClose();
    }
  };

  React.useEffect(() => {
    if (investment && interetInformation) {
      if (investment.term !== interetInformation.month) setIsChange(true);
      else setIsChange(false);
    }
  }, [interetInformation, investment]);

  return (
    <Stack
      sx={{
        width: { xs: "calc(100vw)", sm: "calc(100vw - 80px)" },
        minHeight: "calc(100vh)",
        padding: { xs: "50px 10px 0 10px", sm: "40px 40px 0 40px" },
        background:
          "linear-gradient(150deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)",
      }}
    >
      <CustomizedSteppers step={step} />
      {isChange && (
        <Alert
          severity="warning"
          sx={{ width: "98% !important", mb: 3, mt: 2 }}
          onClose={() => setIsChange(false)}
        >
          <AlertTitle>Changing your investment configuration</AlertTitle>
          You have just changed your investment configuration please ensure that
          your receipt corresponds to your investment configuration. <br />{" "}
          <strong>
            By default, the new configuration will be taken into account
          </strong>
          . If you wish to use the old method, please configure with the old
          process.
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: {
                xs: "calc(80vw) !important",
                sm: "calc(86.5vw) !important",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              m: "10px 0",
            }}
          >
            <Card sx={{ width: "100%" }}>
              <CardHeader
                title="Old configuration"
                subheader="the first configuration you made
      "
              />
              <CardContent sx={{ padding: "0 10px" }}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Durée"
                      secondary={`${investment?.term} mois`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Montant"
                      secondary={`${investment?.amount} dollars`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Taux d'intérêt"
                      secondary={`${
                        (investment.gain / investment.amount) * 100
                      } %`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ width: "100%" }}>
              <CardHeader
                title="New configuration"
                subheader="the last configuration you made
      "
              />
              <CardContent sx={{ padding: "0 10px", width: "100%" }}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Durée"
                      secondary={`${interetInformation?.month} mois`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Montant"
                      secondary={`${interetInformation?.amount} dollars`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Taux d'intérêt"
                      secondary={`${interetInformation?.interet} %`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Alert>
      )}
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={2}
      >
        <Button
          variant="outlined"
          sx={{ borderRadius: "5px" }}
          onClick={() => {
            setStep(0);
            setSumbit(false);
          }}
          disabled={step <= 0}
          size="small"
        >
          Modify Order Setting
        </Button>
        {next && (
          <Button
            variant="contained"
            sx={{ borderRadius: "5px", width: "150px" }}
            onClick={() => {
              setNext(false);
              setStep((state) => (state += 1));
              setSumbit(true);
            }}
            size="small"
          >
            Continue
          </Button>
        )}

        {submit && (
          <LoadingButton
            variant="contained"
            sx={{ borderRadius: "5px" }}
            onClick={handleInvest}
            loading={loader}
            size="large"
          >
            Confirm and proceed
          </LoadingButton>
        )}
      </Stack>

      <Box
        sx={{ width: "calc(100% - 15px)", pb: isChange ? "100px" : "0" }}
        p={"auto 7.5px"}
      >
        {step === 0 && (
          <Simulator
            backgroundColorState
            handleClick={(
              information: React.SetStateAction<
                INVESTINNFORMATIONITEM | undefined
              >,
              investmentId: number
            ) => {
              setStep(1);
              if (information) setInteretInformation(information);
            }}
            investment={investment}
            handleInvestment={setInvestment}
            defaultValue={{
              month: interetInformation?.month ?? investment?.term,
              amount: interetInformation?.amount ?? investment?.amount,
            }}
          />
        )}

        {step === 1 && (
          <Payments
            handleImage={(file: React.SetStateAction<string>) => {
              setPaymentInformation(file);
              setNext(file ? true : false);
            }}
            defaultImage={paymentInformation}
            stepper={stepper === 0 ? 1 : 2}
          />
        )}

        {step === 2 && (
          <InvestmentInformtion interetInformation={interetInformation} />
        )}
      </Box>
    </Stack>
  );
};

export default Investments;
