import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { SimulatorData } from "../../Containers/Simulator";
interface SELECTDURATION {
  SimulatorData: SimulatorData;
  onChangeSimulatorStatus: (search: number, state: boolean) => void;
}
const SelectDuration: React.FC<SELECTDURATION> = ({
  SimulatorData,
  onChangeSimulatorStatus,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChangeSimulator = React.useCallback(
    (newValue: number, _auto = false) => {
      if (_auto) {
        const SimulatorItemTrue = SimulatorData.filter(
          (item) => item.status === true
        );
        const indexOf = SimulatorData.indexOf(SimulatorItemTrue[0]);
        setValue(indexOf);
      } else {
        setValue(newValue);
        const simlatorItemsSelected = SimulatorData.filter(
          (_item, key) => key === newValue
        );
        if (simlatorItemsSelected) {
          onChangeSimulatorStatus(simlatorItemsSelected[0].month, true);
        }
      }
    },
    [SimulatorData, onChangeSimulatorStatus]
  );

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      handleChangeSimulator(newValue);
    },
    [handleChangeSimulator]
  );

  React.useEffect(() => {
    handleChangeSimulator(1, true);
  }, [SimulatorData, handleChangeSimulator]);

  return (
    <Box alignSelf={"flex-end"} sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
        variant="fullWidth"
      >
        {SimulatorData.map((item) => (
          <Tab label={item.month + " month"} key={item.month}/>
        ))}
      </Tabs>
    </Box>
  );
};

export default SelectDuration;
