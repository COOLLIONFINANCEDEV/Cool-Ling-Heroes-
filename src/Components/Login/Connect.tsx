import { Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import React from "react";

interface INITIALVALUES {
  email: string;
  password: string;
}

const Connect = () => {
  const initialValues: INITIALVALUES = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: INITIALVALUES) => {
    // same shape as initial values
    console.log(values);
  };

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
