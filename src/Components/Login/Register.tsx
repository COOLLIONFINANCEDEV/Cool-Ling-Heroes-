import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface REGISTER {
  hanbleChange?: Function;
}

const Register: React.FC<REGISTER> = ({ hanbleChange }) => {
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
      <Typography  sx={{ marginBottom: "5vh" }}>
        Start investing or funding your projects today.
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "20px",
        }}
        component="form"
      >
        <TextField
          label="Email"
          type={"email"}
          name={"email"}
          id={"email"}
          variant="outlined"
          sx={{ width: "95%" }}
        />
        <TextField
          label="Password"
          type={"password"}
          name={"password"}
          id={"password"}
          variant="outlined"
          sx={{ width: "95%" }}
        />
        <TextField
          label="Confirm Password"
          type={"password"}
          name="confirmPassword"
          id="confirmPassword"
          variant="outlined"
          sx={{ width: "95%" }}
        />

        <Button variant="contained" sx={{ width: "95%" }} type="submit">
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
