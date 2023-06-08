import { Box, Typography } from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import React, { useCallback } from "react";
import ApiSession from "../../Service/ApiSession";
import { useDispatch } from "react-redux";
import { RESPONSELAYOUT } from "../../Helpers/FormatResponse";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { hashValue } from "../../Helpers/Hash/HashValue";
import { useLocation } from "react-router-dom";

interface INITIALVALUES {
  email: string;
  password: string;
}

const Connect = () => {
  const initialValues: INITIALVALUES = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmitSuccess = React.useCallback(
    (response: RESPONSELAYOUT) => {
      dispatch(setAlert({ state: "success", message: response.message }));
      const accessToken = hashValue(response.data.accessToken);
      const refreshToken = hashValue(response.data.refreshToken);

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    },
    [dispatch]
  );

  const handleSubmitError = React.useCallback(
    (
      response: RESPONSELAYOUT,
      setFieldError: (fields: string, message: string | undefined) => void
    ) => {
      if (response.errors) {
        response.errors.forEach((item: any) => {
          setFieldError(item.field, item.description);
        });
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (
      values: INITIALVALUES | { magicLink: string },
      helpers: FormikHelpers<INITIALVALUES> | undefined
    ) => {
      const response = await ApiSession.auth.connect(values);
      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
        if (helpers) {
          handleSubmitError(response, helpers?.setFieldError);
        }
      } else {
        handleSubmitSuccess(response);
      }
    },
    [dispatch, handleSubmitError, handleSubmitSuccess]
  );

  React.useEffect(() => {
    const search = location.search;
    const UrlParam = new URLSearchParams(search);
    const param = UrlParam.get("magiclink");
    if (param) {
      handleSubmit({ magicLink: param }, undefined);
    }
  }, [handleSubmit, location]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "10px",
        minWidth: "80%",
      }}
    >
      <Typography variant="h2">Sign In</Typography>
      <Typography sx={{ marginBottom: "5vh" }}>
        Welcome back! Enter your login details to continue.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(8).required(),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "20px",
            }}
            method="post"
          >
            <Field
              label="Email"
              type={"email"}
              name={"email"}
              id={"email"}
              variant="outlined"
              sx={{ width: "95%" }}
              component={FormTextField}
            />
            <Field
              label="Password"
              type={"password"}
              name={"password"}
              id={"password"}
              variant="outlined"
              sx={{ width: "95%" }}
              component={FormTextField}
            />

            <LoadingButton
              variant="contained"
              sx={{ width: "95%" }}
              type="submit"
              loading={isSubmitting}
              loadingPosition="center"
              size="large"
            >
              Sign in
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Connect;
