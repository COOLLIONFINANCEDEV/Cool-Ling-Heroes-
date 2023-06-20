import React from "react";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import Redirect from "../Helpers/Redirect";
import routes from "../Router/routes";
import { useSelector } from "react-redux";
import { selectLogin } from "../Toolkit/Login/LoginSlice";

const NotFound = () => {
  const { isAuthenticated } = useSelector(selectLogin);
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/Assets/Imgs/error.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Redirect
            link={
              isAuthenticated ? routes.home + routes.dashboard : routes.home
            }
          >
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
            >
              Go back to home
            </Button>
          </Redirect>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
