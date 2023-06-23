import React from "react";
import { Alert, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { FormTextField } from "../Formik/FormTextField";
import { OverViewContext } from "../../Context/OverViewContext";

interface INITIALVALUES {
  amount: number;
}

interface REDUCEINVEST {
  information: any;
  handleClose: Function;
}

const ReduceInvest: React.FC<REDUCEINVEST> = ({ information, handleClose }) => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    amount: 0,
  };


  const overViewContextValue = React.useContext(OverViewContext);

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const body = {
        investmentId: information.id,
        reducedAmount: values.amount,
      };
      console.log(body);
      const response = await ApiSession.invest.reduce(body);

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
          amount: yup.number().min(0).max(parseInt(information?.amount)),
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
              Reduction of Investment Amount
            </Typography>
            <Alert
              severity="info"
              sx={{ width: "calc(100% - 20px)", p: "0 10px 10px 10px" }}
            >
              Reducing the amount of your investment may result in penalties.
              Please exercise caution when performing this operation
            </Alert>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Field
                label="amount"
                type={"amount"}
                name={"amount"}
                sx={{ width: "100%" }}
                component={FormTextField}
              />
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

export default ReduceInvest;
