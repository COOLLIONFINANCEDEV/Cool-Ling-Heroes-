import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Components/Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../Service/ApiSession";
import { setAlert } from "../Toolkit/Alert/AlertSlice";

interface INITIALVALUES {
  lastPassword: string;
  password: string;
  confirmPassword: string;
}

const SettingsPassword = () => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    lastPassword: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const body = {
        password: values.lastPassword,
        newPassword: values.password,
      };
      const response = await ApiSession.auth.UpdatePassword(body);

      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
        if (response.errors)
          helper.setFieldError("password", response.errors[0]?.description);
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
      }
    },
    [dispatch]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          password: yup.string().min(8).required(),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), "ll"], "Passwords must match")
            .required(),
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
            <Card sx={{ width: "100%" }}>
              <CardHeader subheader="Update password" title="Password" />
              <Divider />
              <CardContent>
                <Stack spacing={3} sx={{ width: "100%" }}>
                  <Field
                    label="Password"
                    type={"password"}
                    name={"lastPassword"}
                    sx={{ width: "100%" }}
                    component={FormTextField}
                  />
                  <Field
                    label="New password"
                    type={"password"}
                    name={"password"}
                    sx={{ width: "100%" }}
                    component={FormTextField}
                  />
                  <Field
                    label="Confirm new password"
                    type={"password"}
                    name="confirmPassword"
                    sx={{ width: "100%" }}
                    component={FormTextField}
                  />
                </Stack>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <LoadingButton
                  variant="contained"
                  sx={{ width: "100%", borderRadius: "5px" }}
                  type="submit"
                  loading={isSubmitting}
                  loadingPosition="center"
                  size="large"
                >
                  Update
                </LoadingButton>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SettingsPassword;
