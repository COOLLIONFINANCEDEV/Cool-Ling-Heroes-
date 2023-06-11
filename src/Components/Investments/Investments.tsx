import { Box, Button, Stack } from "@mui/material";
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
}

const Investments: React.FC<INVESTMENTS> = ({ handleClose }) => {
  const [step, setStep] = React.useState(0);
  const [interetInformation, setInteretInformation] = React.useState<
    INVESTINNFORMATIONITEM | undefined
  >();
  const [paymentInformation, setPaymentInformation] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [submit, setSumbit] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

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
          size="large"
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
            size="large"
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
    </Stack>
  );
};

export default Investments;
