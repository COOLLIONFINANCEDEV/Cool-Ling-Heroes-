import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { FormTextField } from "../Formik/FormTextField";
import UploadForm from "../Form/UploadButton";
import { AnnoucementContext } from "../../Context/AnnoucementContext";

interface ANNOUCEMENTCREATE {
  information: any;
  handleClose: Function;
}
interface INITIALVALUES {
  title: string;
  status: string;
}

const AnnoucementCreate: React.FC<ANNOUCEMENTCREATE> = ({
  information,
  handleClose,
}) => {
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const AnnoucementStyle = {
    mb: 2,
    fontSize: "1.9rem",
    width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
    minWidth: { xs: "90vw !important", sm: "50vw !important" },
    p: { xs: "50px 10px 0px 10px", sm: "50px 50px 0px 50px" },
  };

  const initialValues: INITIALVALUES = {
    title: "",
    status: "true",
  };
  const AnnoucementContextValue = React.useContext(AnnoucementContext);

  const handleSubmit = React.useCallback(
    async (
      values: INITIALVALUES,
      helpers: FormikHelpers<INITIALVALUES> | undefined
    ) => {
      if (image.length <= 10) {
        setError(true);
      } else {
        const body = {
          ...values,
          image,
          status: values.status === "true" ? true : false,
        };

        const response = await ApiSession.annoucement.create(body);
        if (response.error) {
          dispatch(setAlert({ state: "error", message: response.message }));
        } else {
          dispatch(setAlert({ state: "success", message: response.message }));
          AnnoucementContextValue?.handle(true);
        }
        handleClose();
      }
    },
    [AnnoucementContextValue, dispatch, handleClose, image]
  );

  return (
    <Box sx={AnnoucementStyle}>
      <Stack mb={3}>
        <Typography variant="h6">Creating a new ad</Typography>
      </Stack>

      <Stack rowGap="" alignItems="center" spacing={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object().shape({
            title: yup.string().min(5).max(15).required(),
            status: yup.string().required(),
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
              <Box sx={{ width: "95%" }}>
                <UploadForm
                  imageSelected={(file: React.SetStateAction<string>) => {
                    if (file) {
                      setImage(file);
                      setError(false);
                    }
                  }}
                  title="Upload your annoucement image"
                  error={error}
                  type="image"
                />
              </Box>
              <Field
                label="Ad title"
                type={"text"}
                name={"title"}
                id={"title"}
                variant="outlined"
                sx={{ width: "95%" }}
                component={FormTextField}
              />
              <Field
                label="Status"
                type={"select"}
                name={"status"}
                sx={{ width: "95%" }}
                select
                component={FormTextField}
              >
                <MenuItem value={"true"}>Active</MenuItem>
                <MenuItem value={"false"}>disabled</MenuItem>
              </Field>

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
      </Stack>
    </Box>
  );
};

export default AnnoucementCreate;
