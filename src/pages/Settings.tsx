import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import SettingsPassword from "../Containers/SettingsPassword";
import AnnoucementDashboard from "../Containers/AnnoucementDashboard";
import Roles from "../Seeds/Roles";
import { useSelector } from "react-redux";
import { selectLogin } from "../Toolkit/Login/LoginSlice";

const Settings = () => {
  const { user } = useSelector(selectLogin);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          {user.role === Roles.admin && <AnnoucementDashboard />}
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  );
};

export default Settings;
