import { Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";

interface POPUU {
  status:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  message: string;
  handleClose: Function;
}

const Poppu: React.FC<POPUU> = ({ status, message, handleClose }) => {
  const handleClick = React.useCallback(() => {
    if (typeof handleClose === "function") handleClose();
  }, [handleClose]);

  return (
    <Stack
      sx={{ minWidth:{xs:'70vw',sm:'50vw'} }}
      alignItems="center"
      justifyContent={"space-between"}
      spacing={4}
      p={2}
    >
      {status === "success" && (
        <CheckCircleIcon sx={{ fontSize: 100 }} color={status} />
      )}
      {status === "error" && (
        <ErrorIcon sx={{ fontSize: 100 }} color={status} />
      )}
      <Stack spacing={2}>
        <Typography sx={{ fontSize: "1.2em", textAlign: "justify" }}>
          {message}
        </Typography>
        <Button
          startIcon={<ThumbUpAltIcon />}
          variant="contained"
          size="large"
          color={status}
          onClick={handleClick}
          sx={{ width: "100%",borderRadius:'5px' }}
        >
          got it
        </Button>
      </Stack>
    </Stack>
  );
};

export default Poppu;
