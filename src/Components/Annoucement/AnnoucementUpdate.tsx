import React from "react";
import { Alert, MenuItem, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { FormTextField } from "../Formik/FormTextField";
import { AnnoucementContext } from "../../Context/AnnoucementContext";

interface INITIALVALUES {
  handleAd: string;
}

interface ANNOUCEMENTUPDATE {
  information: any;
  handleClose: Function;
}

const AnnoucementUpdate: React.FC<ANNOUCEMENTUPDATE> = ({
  information,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    handleAd: information.status ? "true" : "false",
  };

  const AnnoucementContextValue = React.useContext(AnnoucementContext);

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const response = await ApiSession.annoucement.update({
        id: information.id,
        status: values.handleAd === "true",
      });

      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
        AnnoucementContextValue?.handle(true);
      }
      handleClose();
    },
    [dispatch, handleClose, information.id, AnnoucementContextValue]
  );
  return (
    <Stack
      sx={{
        mb: 2,
        fontSize: "1.9rem",
        width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
        minWidth: { xs: "90vw !important", sm: "50vw !important" },
        p: { xs: "10px 10px 0px 10px", sm: "50px 50px 0px 50px" },
        mt: { xs: 4, sm: "auto" },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          handleAd: yup.string(),
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
              Activate or deactivate the ad.
            </Typography>
            <Alert
              severity="info"
              sx={{ width: "calc(100% - 20px)", p: "0 10px 10px 10px" }}
            >
              Disabling or enabling the ad means that it will not appear on the
              dashboard or if.
            </Alert>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Field
                label="handleAd"
                type={"select"}
                name={"handleAd"}
                sx={{ width: "100%" }}
                select
                component={FormTextField}
              >
                <MenuItem value={"true"}>Active</MenuItem>
                <MenuItem value={"false"}>Disable</MenuItem>
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

export default AnnoucementUpdate;
