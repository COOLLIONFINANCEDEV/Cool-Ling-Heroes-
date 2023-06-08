import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { width } from "../Theme/size";

const About = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background:
          "linear-gradient(30deg, rgba(253,255,255,0.8118529524539877) 57%, rgba(177,223,215,1) 100%)",
      }}
      pt={15}
      id="about"
    >
      <Stack
        sx={{ width: width, flexDirection: { xs: "column", sm: "row" } }}
        rowGap={5}
      >
        {/* first bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "30%" },
            height: "100%",
          }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <Typography variant="h4" m={0} p={0} fontWeight={800}>
            What we do
          </Typography>
        </Stack>

        {/* second bloc */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "70%" },
            margin: { xs: "auto", sm: "auto 20px auto auto" },
          }}
          justifyContent={"space-between"}
          alignItems={"space-between"}
          spacing={3}
        >
          <Box>
            <Typography variant="h5" color={"primary"} fontWeight={600}>
              Our Mission
            </Typography>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique laborum modi voluptates dolorum at rerum blanditiis
              asperiores nihil nulla labore! Animi ipsa dolores obcaecati eum
              ut. Doloribus labore soluta alias Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ducimus, molestias.
            </Typography>
          </Box>{" "}
          <Box>
            <Typography variant="h5" color={"primary"} fontWeight={600}>
              Our Reason
            </Typography>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
              cumque eius quis totam iusto quaerat adipisci sit quod molestiae
              magnam, consequatur possimus officia temporibus exercitationem quo
              iste minima sunt dolor optio fuga dolores atque facere! Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Assumenda sunt
              adipisci neque accusantium cupiditate veniam.
            </Typography>
          </Box>{" "}
          <Box>
            <Typography variant="h5" color={"primary"} fontWeight={600}>
              Our Model
            </Typography>
            <Typography >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque nemo expedita eaque ipsum, modi deserunt, facere
              laudantium perspiciatis laboriosam quasi, commodi asperiores
              aliquam illo doloribus? Quidem id ratione hic nulla. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Officia minima
              tempora molestiae excepturi culpa optio.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default About;
