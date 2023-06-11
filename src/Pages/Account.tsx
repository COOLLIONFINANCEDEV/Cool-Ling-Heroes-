import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AccountProfile from "../Containers/AccountProfile";
import AccountProfileDetails from "../Containers/AccountProfileDetails";

const Account = () => {
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
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={4} item>
                <AccountProfile />
              </Grid>
              <Grid xs={12} sm={6} lg={8} item>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Account;
