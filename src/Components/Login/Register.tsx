import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import countriesList from "../../Seeds/Country";
interface REGISTER {
  hanbleChange?: Function;
}

const Register: React.FC<REGISTER> = ({ hanbleChange }) => {
  interface INITIALVALUES {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    prefixe: string;
  }
  const initialValues: INITIALVALUES = {
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    prefixe: "",
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
      <Typography variant="h2">Sign UP</Typography>
      <Typography sx={{ marginBottom: "5vh" }}>
        Start investing or funding your projects today.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          phone: yup
            .string()
            .matches(/^\d{8,12}$/, "Invalid phone number")
            .required(),
          password: yup.string().min(8).required(),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), "ll"], "Passwords must match")
            .required(),
          prefixe: yup.string().required("required"),
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
              sx={{ width: "95%" }}
              component={FormTextField}
            />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"95%"}
            >
              <Field
                sx={{ width: "22%" }}
                as={Select}
                label={"code"}
                name={"prefixe"}
                select
                component={FormTextField}
              >
                {countriesList.map((item) => {
                  if (item.idd.root === undefined) {
                    // eslint-disable-next-line array-callback-return
                    return;
                  }
                  return (
                    <MenuItem
                      value={`${
                        item?.idd?.root
                      }${item?.idd?.suffixes?.join()} `}
                      key={item.name.common}
                    >
                      {`${item?.idd?.root}${item?.idd?.suffixes
                        ?.slice(0, 2)
                        ?.join(` ${item?.idd?.root}`)} `}{" "}
                      {item?.flag}
                    </MenuItem>
                  );
                })}
              </Field>
              <Field
                label="Phone number"
                type={"phone"}
                name={"phone"}
                sx={{ width: "75%" }}
                component={FormTextField}
              />
            </Stack>
            <Field
              label="Password"
              type={"password"}
              name={"password"}
              sx={{ width: "95%" }}
              component={FormTextField}
            />
            <Field
              label="Confirm Password"
              type={"password"}
              name="confirmPassword"
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
              Sign up
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
