import { Stack } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

const Annoucement = () => {
  return (
    <Carousel
      sx={{
        width: "calc(100% -20px)",
        padding: "10px",
        minHeight: "400px",
      }}
      swipe
      indicators
      interval={5000}
      duration={1000}
    >
      <Stack>
        <img src="/Assets/Illustrations/Exemple.svg" alt="ll" />
      </Stack>
      <Stack>
        <img src="/Assets/Illustrations/Exemple2.svg" alt="ll" />
      </Stack>
      <Stack>
        <img src="/Assets/Illustrations/Exemple.svg" alt="ll" />
      </Stack>
      <Stack>
        <img src="/Assets/Illustrations/Exemple2.svg" alt="ll" />
      </Stack>
    </Carousel>
  );
};

export default Annoucement;
