import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, selectLogin } from "../Toolkit/Login/LoginSlice";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormTextField } from "../Components/Formik/FormTextField";
import countriesList from "../Seeds/Country";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../Service/ApiSession";
import { setAlert } from "../Toolkit/Alert/AlertSlice";
import React from "react";

interface INITIALVALUES {
  email: string;
  phone: string;
  prefixe: string;
  firstName: string;
  lastName: string;
}

const AccountProfileDetails = () => {
  const { user } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    prefixe: "",
  };

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const phone = (values.prefixe + values.phone).replace(/\s/g, "");
      const body = {
        full_name: values.firstName + " " + values.lastName,
        phone_number: phone,
      };
      const response = await ApiSession.user.update(body);

      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
        dispatch(UpdateUser({ type: "infos", ...values }));
        return;
      }
    },
    [dispatch]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          phone: yup
            .string()
            .matches(/^\d{8,12}$/, "Invalid phone number")
            .required(),
          prefixe: yup.string().required("required"),
          firstName: yup.string().required(),
          lastName: yup.string().required(),
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
            <Card>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      {" "}
                      <Field
                        label="First Name"
                        type={"text"}
                        name={"firstName"}
                        sx={{ width: "100%" }}
                        component={FormTextField}
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Field
                        label="Last Name"
                        type={"text"}
                        name="lastName"
                        sx={{ width: "100%" }}
                        component={FormTextField}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      {" "}
                      <Field
                        label="Email"
                        type={"email"}
                        name={"email"}
                        sx={{ width: "100%" }}
                        disabled
                        component={FormTextField}
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      {" "}
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"flex-start"}
                        width={"100%"}
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
                    </Grid>
                  </Grid>
                </Box>
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
                  Save Details
                </LoadingButton>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountProfileDetails;
