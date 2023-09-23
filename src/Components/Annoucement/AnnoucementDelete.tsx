import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, Typography } from "@mui/material";
import React from "react";
import ApiSession from "../../Service/ApiSession";
import { setAlert } from "../../Toolkit/Alert/AlertSlice";
import { useDispatch } from "react-redux";
import { AnnoucementContext } from "../../Context/AnnoucementContext";

interface ANNOUCEMENTDELET {
  information: any;
  handleClose: Function;
}

const AnnoucementDelete: React.FC<ANNOUCEMENTDELET> = ({
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
  const AnnoucementContextValue = React.useContext(AnnoucementContext);

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);
    const response = await ApiSession.annoucement.delete({
      AnnoucementId: parseInt(information.id),
    });
    if (response.error) {
      dispatch(setAlert({ state: "error", message: response.message }));
    } else {
      dispatch(setAlert({ state: "success", message: response.message }));
      AnnoucementContextValue?.handle(true);
    }
    handleClose();
    setLoading(false);
  }, [dispatch, handleClose, information.id, AnnoucementContextValue]);

  return (
    <Box sx={deleteStyle}>
      <Stack mb={3}>
        <Typography variant="h6" color={"error"}>
          Are you absolutely sure?
        </Typography>
        <Alert severity={"warning"}>
          This action cannot be undone. This will permanently disable this Ad
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
          I understand the consequence, delete this Ad
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default AnnoucementDelete;
