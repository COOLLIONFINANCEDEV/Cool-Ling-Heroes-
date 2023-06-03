import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

const SelectDuration = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const month = ["3 month", "6 month", "9 month", "12 month", "19 month"];
  return (
    <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
        variant="fullWidth"
      >
        {month.map((item) => (
          <Tab label={item} key={item} />
        ))}
      </Tabs>
    </Box>
  );
};

export default SelectDuration;
