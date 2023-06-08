import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { width } from "../Theme/size";

const HowItWorks = () => {
  const HowItWorksData = [
    {
      title: "Discover",
      content: "Explore real estate opportunities and earn returns.",
    },
    {
      title: "Customize",
      content: "Choose investment settings for desired returns.",
    },
    {
      title: "Earn",
      content: "Generate stable income in multiple currencies.",
    },
    {
      title: "Withdraw",
      content: "Convert earnings to stablecoins or local currency.",
    },
  ];

  return (
    <Stack
      pt={15}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background:
          "linear-gradient(200deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)",
      }}
      pb={15}
      id="howitwork"
    >
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={width}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            spacing={3}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography fontWeight={800} variant="h4">
              How Invest kori Works
            </Typography>
            <Typography>
              “KORI is a real estate investment marketplace where Africans
              (Nigeria, Ghana, more countries) can patronize fixed-income real
              estate opportunities and earn returns in stable currencies (dollar
              and euro-denominated) that can then be withdrawn in stablecoins or
              your local currency.”
            </Typography>
          </Stack>
          <Stack
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            mt={5}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            rowGap={5}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                height: "100%",
                borderRadius: "10px",
              }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/7f91fGZj3TM"
                title="YouTube Video Player"
                frameBorder="0"
                allow="Accelerometer; Autoplay; Clipboard-Write; Encrypted-Media; Gyroscope; Picture-In-Picture; Web-Share"
              ></iframe>
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "50%" }, height: "100%" }}>
              <Box
                component={"ol"}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  flexDirection: { xs: "column", sm: "row" },
                  columnGap: "4%",
                  rowGap: "10vh",
                  pl: { xs: "20px", sm: "30px" },
                }}
              >
                {HowItWorksData.map((item) => (
                  <Box
                    component={"li"}
                    sx={{
                      width: {
                        xs: "calc(100% - 20px)",
                        sm: "calc(48% - 30px)",
                      },
                    }}
                    key={item.title}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontStyle: "italic",
                        fontSize: "1em",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography>{item.content}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HowItWorks;
