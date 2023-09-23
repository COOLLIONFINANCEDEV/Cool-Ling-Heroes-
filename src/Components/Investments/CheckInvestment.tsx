import React from "react";
import { Alert, MenuItem, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { FormTextField } from "../Formik/FormTextField";
import { OverViewContext } from "../../Context/OverViewContext";

interface INITIALVALUES {
  CheckInvestment: string;
}

interface CHECKINVESTMENT {
  information: any;
  handleClose: Function;
}

const CheckInvestment: React.FC<CHECKINVESTMENT> = ({
  information,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    CheckInvestment: "true",
  };

  const overViewContextValue = React.useContext(OverViewContext);

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const body = {
        investmentId: information.id,
        reducedAmount: values.CheckInvestment === "true",
      };
      const response = await ApiSession.invest.checkUp({
        investmentId: body.investmentId,
        accepted: body.reducedAmount,
      });

      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
        overViewContextValue?.handle(true);
      }
      handleClose();
    },
    [dispatch, handleClose, information.id, overViewContextValue]
  );

  return (
    <Stack
      sx={{
        mb: 2,
        fontSize: "1.9rem",
        width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
        minWidth: { xs: "90vw !important", sm: "50vw !important" },
        p: { xs: "10px 10px 0px 10px", sm: "50px 50px 0px 50px" },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          CheckInvestment: yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              rowGap: "20px",
            }}
            method="post"
          >
            <Typography variant="h6" pt={2}>
              Verification of investment payment.
            </Typography>
            <Alert
              severity="info"
              sx={{ width: "calc(100% - 20px)", p: "0 10px 10px 10px" }}
            >
              By clicking on the confirmation button, you can confirm the
              investment with a receipt provided as proof.
            </Alert>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Field
                label="CheckInvestment"
                type={"select"}
                name={"CheckInvestment"}
                sx={{ width: "100%" }}
                select
                component={FormTextField}
              >
                <MenuItem value={"true"}>Verify and confirm this investment</MenuItem>
                <MenuItem value={"false"}>Cancel</MenuItem>
              </Field>
            </Stack>
            <LoadingButton
              variant="contained"
              sx={{ width: "100%", borderRadius: "5px" }}
              type="submit"
              loading={isSubmitting}
              loadingPosition="center"
              size="large"
            >
              Proceed with Reduction
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default CheckInvestment;
