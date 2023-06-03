import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

const SelectAprAndDuration = () => {
  return (
    <Stack sx={{ width: "100%" }}>
      <ToggleButtonGroup fullWidth value={"right"}>
        <ToggleButton value="left" key="left">
          <Button>
            content 1 <br /> content 2
          </Button>
        </ToggleButton>

        <ToggleButton value="center" key="center">
          <Button>
            content 1 <br /> content 2
          </Button>
        </ToggleButton>

        <ToggleButton value="right" key="right">
          <Button>
            content 1 <br /> content 2
          </Button>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default SelectAprAndDuration;
