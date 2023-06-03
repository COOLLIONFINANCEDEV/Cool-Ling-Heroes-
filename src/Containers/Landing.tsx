import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { width } from "../Theme/size";
import Redirect from "../Helpers/Redirect";
import routes from "../Router/routes";
import Simulator from "./Simulator";

const Landing = () => {
  const LandingStyle = {
    width: width,
    margin: "0 auto",
    padding: "0",
    flexDirection: { xs: "column", sm: "row" },
  };
  return (
    <>
      <Stack
        sx={{
          width: "100vw",
          minHeight:{xs:'80vh',sm:'initial'},
          zIndex: "3",
          background:
            "linear-gradient(0deg, rgba(6,152,129,1) 27%, rgba(2,199,150,1) 68%, rgba(238,248,246,1) 100%)",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack sx={LandingStyle}>
          <Stack
            sx={{
              width: { xs: "100%", sm: "45%" },
              justifyContent: { xs: "center", sm: "center" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
            spacing={2}
          >
            <Box>
              <Typography variant="h3" color={"secondary"}>
                Transforming the Investment Landscape:{" "}
                <Typography component={"span"} variant="h3" color={"secondary"}>
                  A New Approach
                </Typography>
              </Typography>
              <img src="Assets/Illustrations/underline.svg" alt="underline" />
              <Typography color={"secondary"} fontSize={14}>
                Fueling Economic Expansion: Providing Investors with Fixed
                Returns and Enabling Market Growth.
              </Typography>
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              width={"100%"}
              sx={{ zIndex: "1" }}
            >
              <Redirect link={routes.login}>
                <Button color="secondary" variant="outlined" size="large">
                  Connect With Experts
                </Button>
              </Redirect>
              <Redirect link={routes.login}>
                <Button color="secondary" variant="contained" size="large">
                  Start Investing
                </Button>
              </Redirect>
            </Stack>
          </Stack>
          <Stack
            sx={{
              display: { xs: "none", sm: "flex" },
              width: "55%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(Assets/Illustrations/Blob.svg)`,
              backgroundPosition: "100%",
              backgroundAttachment: "inherit",
              zIndex: "1",
            }}
          >
            <img
              src="Assets/Illustrations/Invest.svg"
              alt="Invest Your Money"
              style={{ zIndex: "2", width: "100%" }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100vw",
          transform: { xs: "translate(0,-10px)", sm: "translate(0,-80px)" },
          overflow: "hidden",
        }}
      >
        <img
          src="Assets/Illustrations/wave.svg"
          alt="wave"
          style={{ zIndex: "-1" }}
        />
      </Stack>
      <Simulator />
    </>
  );
};

export default Landing;
