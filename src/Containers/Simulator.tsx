import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { width } from "../Theme/size";
import BarChart from "../Components/Chart/BarChart";
import SelectInteret from "../Components/InvestCalculator/SelectInteret";
import SelectDuration from "../Components/InvestCalculator/SelectDuration";
import SelectAprAndDuration from "../Components/InvestCalculator/SelectAprAndDuration";

const Simulator = () => {
  
  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{background:'linear-gradient(171deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)',minHeight:'100vh'}}>
      <Stack
        sx={{ width: width, flexDirection: { xs: "column", sm: "row" } }}
        rowGap={5}
      >
        {/* first bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" },
            margin: { xs: "auto", sm: "auto 20px auto auto" },
          }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={5}
        >
          <Typography variant="h4" color={"primary"} fontWeight={600}>
            Invest in real estate and make your money grow
          </Typography>

          <Stack
            justifyContent={"space-between"}
            sx={{ width: "100%", flexDirection: { xs: "column", sm: "row" } }}
            rowGap={2}
          >
            <Typography fontWeight={"600"}>Investment amount</Typography>
            <FormControl sx={{ width: { xs: "100%", sm: "auto" } }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                defaultValue={1000}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "flex", sm: "none !important" },
            }}
          >
            <Typography fontWeight={"600"}>APR & Duration</Typography>
            <SelectAprAndDuration />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography fontWeight={"600"}>Duration</Typography>
            <SelectDuration/>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography fontWeight={"600"}>Annual Percentage Rate</Typography>
            <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
              <SelectInteret />
            </Box>
          </Stack>

          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{ display: { xs: "none", sm: "initial" } }}
          >
            <Typography m={1} color={"secondary"}>
              Start Investing
            </Typography>
          </Button>
        </Stack>

        {/* second bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" },
            overflow: "hidden",
            borderRadius: "15px",
          }}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          rowGap={3}
        >
          <BarChart />
          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{
              display: { xs: "initial", sm: "none" },
              width: "80%",
              margin: "auto",
              mb: 3,
            }}
            fullWidth
          >
            <Typography m={1} color={"secondary"}>
              Start Investing
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Simulator;
