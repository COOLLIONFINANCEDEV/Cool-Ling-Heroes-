import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { SimulatorData } from "../../Containers/Simulator";

interface SELECAPRANDDURATION {
  SimulatorData: SimulatorData;
  onChangeSimulatorStatus: (search: number, state: boolean) => void;
}

const SelectAprAndDuration: React.FC<SELECAPRANDDURATION> = ({
  SimulatorData,
  onChangeSimulatorStatus,
}) => {
  const [value, setValue] = React.useState();
  const handleChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: any
  ) => {
    handleChangeSimulator(newValue);
  };

  const handleChangeSimulator = React.useCallback(
    (newValue: any, _auto = false) => {
      const simlatorItemsSelected = SimulatorData.filter(
        (_item) => _item.month === newValue[0]
      );
      if (simlatorItemsSelected) {
        onChangeSimulatorStatus(simlatorItemsSelected[0].month, true);
      }
    },
    [SimulatorData, onChangeSimulatorStatus]
  );

  return (
    <Stack sx={{ width: "100%" }}>
      <ToggleButtonGroup fullWidth onChange={handleChange}>
        {SimulatorData.map((item) => (
          <ToggleButton
            value={item.month}
            key={item.interet}
            selected={item.status}
          >
            {item.interet + " %"} <br /> {item.month + " month"}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default SelectAprAndDuration;
