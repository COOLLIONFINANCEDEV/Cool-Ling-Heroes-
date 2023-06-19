import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { SimulatorData, SimulatorItem } from "../../Containers/Simulator";
interface SELECTDURATION {
  SimulatorData: SimulatorData;
  onChangeSimulatorStatus: (type: "interet", interet: number) => void;
}
const SelectDuration: React.FC<SELECTDURATION> = ({
  SimulatorData,
  onChangeSimulatorStatus,
}) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    SimulatorData.forEach((item: SimulatorItem, key) => {
      if (item.status) {
       setValue(key)
      }
    });
  }, [SimulatorData]);
  return (
    <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
      <Tabs value={value} sx={{ width: "100%" }} variant="fullWidth">
        {SimulatorData.map((item) => (
          <Tab label={item.interet + " %"} key={item.month} sx={{cursor:'default'}}/>
        ))}
      </Tabs>
    </Box>
  );
};

export default SelectDuration;
