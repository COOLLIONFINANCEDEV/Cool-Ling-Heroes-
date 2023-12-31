import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { useDispatch } from "react-redux";
import { OverViewContext } from "../../Context/OverViewContext";

interface DELETEINVESTMENT {
  information: any;
  handleClose: Function;
}

const DeleteInvestment: React.FC<DELETEINVESTMENT> = ({
  information,
  handleClose,
}) => {
  const deleteStyle = {
    mb: 2,
    fontSize: "1.9rem",
    width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
    minWidth: { xs: "90vw !important", sm: "50vw !important" },
    p: { xs: "50px 10px 0px 10px", sm: "50px 50px 0px 50px" },
  };

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const overViewContextValue = React.useContext(OverViewContext);

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);
    const response = await ApiSession.invest.disable({
      investmentId: parseInt(information.id),
    });
    if (response.error) {
      dispatch(setAlert({ state: "error", message: response.message }));
    } else {
      dispatch(setAlert({ state: "success", message: response.message }));
      overViewContextValue?.handle(true);
    }
    handleClose();
    setLoading(false);
  }, [dispatch, handleClose, information.id, overViewContextValue]);

  return (
    <Box sx={deleteStyle}>
      <Stack mb={3}>
        <Typography variant="h6" color={"error"}>
          Are you absolutely sure?
        </Typography>
        <Alert severity={"warning"}>
          This action cannot be undone. This will permanently disable this
          investment
        </Alert>
      </Stack>

      <Stack rowGap="" alignItems="center" spacing={2}>
        <LoadingButton
          variant="contained"
          sx={{ borderRadius: "5px" }}
          color="error"
          size="large"
          loading={loading}
          loadingPosition="center"
          onClick={handleSubmit}
        >
          I understand the consequence, delete this project
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default DeleteInvestment;
