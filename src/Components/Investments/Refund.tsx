import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { FormTextField } from "../Formik/FormTextField";
import { OverViewContext } from "../../Context/OverViewContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Row } from "./ShowInvestement";
import FormatDate from "../../Helpers/FormatDate";
import UploadForm from "../Form/UploadButton";

interface INITIALVALUES {
  amount: number;
}

interface REFUND {
  information: any;
  handleClose: Function;
}

const Refund: React.FC<REFUND> = ({ information, handleClose }) => {
  const dispatch = useDispatch();
  const initialValues: INITIALVALUES = {
    amount: 0,
  };
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [image1, setImage1] = React.useState("");
  const [error, setError] = React.useState(false);
  const [error1, setError1] = React.useState(false);
  const overViewContextValue = React.useContext(OverViewContext);

  const handleSubmit = React.useCallback(
    async (values: INITIALVALUES, helper: FormikHelpers<INITIALVALUES>) => {
      if (image1.length <= 10) {
        setError1(true);
      } else {
        const body = {
          accepted: true,
          investmentId: parseInt(information.id),
          amount: values.amount,
          refundProof: image1,
        };
        const response = await ApiSession.invest.refund(body);
        if (response.error) {
          dispatch(setAlert({ state: "error", message: response.message }));
        } else {
          dispatch(setAlert({ state: "success", message: response.message }));
          overViewContextValue?.handle(true);
        }
        handleClose();
      }
    },
    [dispatch, handleClose, image1, information.id, overViewContextValue]
  );

  const handleWithDrawal = React.useCallback(
    async (values: any) => {
      if (image.length <= 10) {
        setError(true);
      } else {
        const body = {
          accepted: true,
          changeRequestId: values.id,
          refundProof: image,
          investmentId: values.investmentId,
        };
        setLoading(true);
        const response = await ApiSession.invest.refund(body);
        if (response.error) {
          dispatch(setAlert({ state: "error", message: response.message }));
        } else {
          dispatch(setAlert({ state: "success", message: response.message }));
          overViewContextValue?.handle(true);
        }
        handleClose();
        setLoading(false);
      }
    },
    [dispatch, handleClose, image, overViewContextValue]
  );

  React.useEffect(() => {
    if (image.length > 10) {
      setError(false);
    }
    if (image1.length > 10) {
      setError1(false);
    }
  }, [image, image1]);

  return (
    <Stack
      sx={{
        mb: 2,
        fontSize: "1.9rem",
        width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
        minWidth: { xs: "90vw !important", sm: "50vw !important" },
        p: { xs: "50px 10px 0px 10px", sm: "50px 50px 0px 50px" },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          amount: yup.number().min(0).max(parseInt(information?.amount)),
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
              Repayment of investment
            </Typography>
            <Alert
              severity="warning"
              sx={{ width: "calc(100% - 20px)", p: "0 10px 10px 10px" }}
            >
              Be careful with any actions you take here, as they are
              irreversible.
            </Alert>
            {information.ChangeRequest?.filter((item:any) => item.treated === false)?.length >= 1 && (
              <Box sx={{ width: "100%" }} mb={5}>
                <Accordion expanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={500}>
                      {" "}
                      User withdrawal requests
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {information.ChangeRequest?.map(
                      (item: any, key: number) => {
                        return (
                          <Accordion key={key}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography fontSize={"0.90rem"} fontWeight={400}>
                                Withdrawal request {item?.id}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Row
                                title="Request amount"
                                value={item?.amount + " $"}
                              />
                              <Row
                                title="amount receivable"
                                value={item?.amount_to_refund + " $"}
                              />
                              <Row
                                title="Request status"
                                value={
                                  !item?.treated ? (
                                    <Chip
                                      label={"pending"}
                                      variant="outlined"
                                      color="info"
                                    />
                                  ) : (
                                    <Chip
                                      label={"completed"}
                                      variant="outlined"
                                      color="success"
                                    />
                                  )
                                }
                              />
                              <Row
                                title="Created at"
                                value={FormatDate(item.created_at)}
                              />
                              <UploadForm
                                imageSelected={(
                                  file: React.SetStateAction<string>
                                ) => {
                                  if (file) {
                                    setImage(file);
                                  }
                                }}
                                title="Upload a Payment Record"
                                error={error}
                                buttonMode
                                disabled={item.treated}
                              />
                              <LoadingButton
                                onClick={() => handleWithDrawal(item)}
                                loading={loading}
                                loadingPosition="center"
                                sx={{ width: "100%", borderRadius: "5px" }}
                                variant="contained"
                                disabled={item.treated}
                              >
                                Accept withdrawal
                              </LoadingButton>
                            </AccordionDetails>
                          </Accordion>
                        );
                      }
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            <Stack
              spacing={1}
              sx={{ width: "100%" }}
            >
              <UploadForm
                imageSelected={(file: React.SetStateAction<string>) => {
                  if (file) {
                    setImage1(file);
                  }
                }}
                title="Upload a Payment Record"
                error={error1}
                disabled={isSubmitting}
              />
              <Field
                label="amount"
                type={"amount"}
                name={"amount"}
                sx={{ width: "100%" }}
                component={FormTextField}
              />
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

export default Refund;
