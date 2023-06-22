import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import SettingsPassword from "../Containers/SettingsPassword";
import AnnoucementDashboard from "../Containers/AnnoucementDashboard";

const Settings = () => {
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
          <AnnoucementDashboard/>
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  );
};

export default Settings;
