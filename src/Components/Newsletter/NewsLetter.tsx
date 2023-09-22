import { Stack, Typography } from "@mui/material";
import * as yup from "yup";
import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormTextField } from "../Formik/FormTextField";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { useDispatch } from "react-redux";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";

interface INITIALVALUES {
  email: string;
}

interface NEWSLETTER {
  handleClose: Function;
}

const NewsLetter: React.FC<NEWSLETTER> = ({ handleClose }) => {
  const initialValues: INITIALVALUES = {
    email: "",
  };
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    async (
      values: INITIALVALUES,
      helpers: FormikHelpers<INITIALVALUES> | undefined
    ) => {
      handleClose();
      const response = await ApiSession.newsLetter.create(values);
      if (!response.error)
        dispatch(setAlert({ state: "success", message: response.message }));
    },
    [dispatch, handleClose]
  );
  return (
    <Stack
      sx={{
        background:
          "linear-gradient(221deg, rgba(253,255,255,0.8118529524539877) 69%, rgba(177,223,215,1) 100%)",
        p: { xs: 2, sm: 6 },
        width: { xs: "85vw", sm: "auto" },
      }}
    >
      <Typography variant="h4">Early birds get the alpha</Typography>
      <Typography>
        Sign up to receive email updates about our upcoming news and
        announcements.
      </Typography>

      <Stack justifyContent={"center"} alignItems={"center"} spacing={1} mt={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
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
              <LoadingButton
                variant="contained"
                sx={{ width: "95%" }}
                type="submit"
                loading={isSubmitting}
                loadingPosition="center"
                size="large"
              >
                SUBSCRIBE
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default NewsLetter;
