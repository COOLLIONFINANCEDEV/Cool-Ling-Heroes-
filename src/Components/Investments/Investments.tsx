import { Box, Button, Stack } from "@mui/material";
import React from "react";
import CustomizedSteppers from "../CutomzedSteppers";
import Simulator from "../../Containers/Simulator";
import Payments from "../Payments/Payments";
import InvestmentInformtion, {
  INVESTINNFORMATIONITEM,
} from "./InvestmentInformtion";
import { OverViewContext } from "../../Pages/OverView";

const Investments = () => {
  const [step, setStep] = React.useState(0);
  const [interetInformation, setInteretInformation] = React.useState<
    INVESTINNFORMATIONITEM | undefined
  >();
  const [paymentInformation, setPaymentInformation] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [submit, setSumbit] = React.useState(false);

  const OverViewContextValue = React.useContext(OverViewContext);
  const stateLoader = OverViewContextValue ? OverViewContextValue.state : false;
  const HandleLoader = OverViewContextValue
    ? OverViewContextValue.handle
    : () => {};

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

      <Box sx={{ width: "calc(100% - 15px)" }} p={"auto 7.5px"}>
        {step === 0 && (
          <Simulator
            backgroundColorState
            handleClick={(
              information: React.SetStateAction<
                INVESTINNFORMATIONITEM | undefined
              >
            ) => {
              setStep(1);
              if (information) setInteretInformation(information);
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
          />
        )}

        {step === 2 && (
          <InvestmentInformtion interetInformation={interetInformation} />
        )}
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={2}
        pt={4}
        pb={4}
      >
        <Button
          variant="outlined"
          sx={{ borderRadius: "5px" }}
          onClick={() => {
            setStep(0);
            setSumbit(false);
          }}
          disabled={step <= 0}
        >
          Modify Order Setting
        </Button>
        {next && (
          <Button
            variant="contained"
            sx={{ borderRadius: "5px", width: "150px" }}
            onClick={() => {
              setNext(false);
              setStep((state) => (state += state));
              setSumbit(true);
            }}
          >
            Continue
          </Button>
        )}

        {submit && (
          <Button variant="contained" sx={{ borderRadius: "5px" }}>
            Confirm and proceed
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Investments;
