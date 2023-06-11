import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import countriesList from "../../Seeds/Country";
import ApiSession from "../../Service/ApiSession";
import { RESPONSELAYOUT } from "../../Helpers/FormatResponse";
import { useDispatch } from "react-redux";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { setPoppu } from "../../Toolkit/Poppu/PoppuSlice";
import AppMessage from "../../Seeds/AppMessage";
interface REGISTER {
  hanbleChange?: Function;
}

interface INITIALVALUES {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  prefixe: string;
}

const Register: React.FC<REGISTER> = ({ hanbleChange }) => {
  const initialValues: INITIALVALUES = {
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    prefixe: "",
  };

  const dispatch = useDispatch();

  const handleSubmit = async (
    values: INITIALVALUES,
    helper: FormikHelpers<INITIALVALUES>
  ) => {
    const phone = (values.prefixe + values.phone).replace(/\s/g, "");
    const response = await ApiSession.auth.register({
      email: values.email,
      password: values.password,
      phone_number: phone,
    });

    if (response) {
      if (response?.error) {
        handleSubmitError(response, helper.setFieldError);
      } else {
        dispatch(
          setPoppu({
            state: "success",
            message: AppMessage.Poppu.register,
            noLeave: true,
          })
        );
      }
    }
  };

  const handleSubmitError = (
    response: RESPONSELAYOUT,
    setFieldError: (fields: string, message: string | undefined) => void
  ) => {
    dispatch(setAlert({ state: "error", message: response.message }));
    if (response.errors) {
      response.errors.forEach((item: any) => {
        if (Object.keys(initialValues).includes(item.field)) {
          setFieldError(item.field, item.description);
        } else {
          setFieldError("phone", item.description);
        }
      });
    }
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
              alignItems={"flex-start"}
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
              sx={{ width: "95%", borderRadius: "5px" }}
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
