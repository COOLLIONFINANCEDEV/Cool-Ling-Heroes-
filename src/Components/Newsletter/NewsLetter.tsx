import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const NewsLetter = () => {
  return (
    <Stack
      sx={{
        background:
          "linear-gradient(221deg, rgba(253,255,255,0.8118529524539877) 69%, rgba(177,223,215,1) 100%)",
          p:{xs:2,sm:6},
          width:{xs:'85vw',sm:"auto"}
      }}
    >
      <Typography variant="h4">Early birds get the alpha</Typography>
      <Typography>
        Sign up to receive email updates about our upcoming news and
        announcements.
      </Typography>

      <Stack justifyContent={"center"} alignItems={"center"} spacing={1} mt={2}>
        <TextField
          type="email"
          variant="outlined"
          fullWidth
          defaultValue={"Example@gmail.com"}
        />
        <Button variant="contained" sx={{ borderRadius: "5px" }} fullWidth>
          SUBSCRIBE
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewsLetter;
