import React from "react";
import { Alert, MenuItem, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { FormTextField } from "../Formik/FormTextField";
import { CustomersContext } from "../../Context/CustomersContext";
import Roles from "../../Seeds/Roles";

interface INITIALVALUES {
  role: string;
}

interface CHANGEROLE {
  information: any;
  handleClose: Function;
}

const ChangeRole: React.FC<CHANGEROLE> = ({ information, handleClose }) => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    role: information.role,
  };

  const CustomersContextValue = React.useContext(CustomersContext);

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      const body = {
        role: values.role,
        user_id:information.id
      };

      const response = await ApiSession.user.changeRole(body);
      if (response.error) {
        dispatch(setAlert({ state: "error", message: response.message }));
      } else {
        dispatch(setAlert({ state: "success", message: response.message }));
        CustomersContextValue?.handle(true);
      }
      handleClose();
    },
    [dispatch, handleClose, information.id, CustomersContextValue]
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
          role: yup.string(),
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
              Change user role.
            </Typography>
            <Alert
              severity="info"
              sx={{ width: "calc(100% - 20px)", p: "0 10px 10px 10px" }}
            >
              By clicking on the confirmation button, you can change the user's
              role, taking care when doing so.
            </Alert>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Field
                label="role"
                type={"role"}
                name={"role"}
                sx={{ width: "100%" }}
                select
                component={FormTextField}
              >
                {Object.values(Roles).map((item) => (
                  <MenuItem value={item} key={item}>
                    <Typography textTransform={"capitalize"}>{item}</Typography>
                  </MenuItem>
                ))}
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
             Confirm
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default ChangeRole;
