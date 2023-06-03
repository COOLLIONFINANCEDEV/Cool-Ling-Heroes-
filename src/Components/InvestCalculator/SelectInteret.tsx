import * as React from "react";
import Slider from "@mui/material/Slider";
const marks = [
  {
    value: 0,
    label: "3.5%",
  },
  {
    value: 25,
    label: "5%",
  },
  {
    value: 50,
    label: "5.5%",
  },
  {
    value: 75,
    label: "7%",
  },
  {
    value: 100,
    label: "8%",
  },
];

export default function SelectInteret() {
  return (
    <Slider
      aria-label="Restricted values"
      defaultValue={0}
      step={null}
      marks={marks}
      sx={{
        height: "20px !important",
      }}
    />
  );
}
