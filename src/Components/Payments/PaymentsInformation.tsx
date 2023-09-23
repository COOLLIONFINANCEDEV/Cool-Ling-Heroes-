import { Divider, Paper, Typography } from "@mui/material";
import React from "react";

const PaymentsInformation = () => {
  return (
    <Paper
      elevation={5}
      sx={{ width: "calc(100% - 100px)", minHeight: "50vh", p: "50px" }}
    >
      <Typography variant="h5">Payment Information</Typography>
      <Divider />
    </Paper>
  );
};

export default PaymentsInformation;
