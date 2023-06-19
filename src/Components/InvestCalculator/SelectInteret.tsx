import * as React from "react";
import Slider from "@mui/material/Slider";
import { SimulatorData} from "../../Containers/Simulator";
interface SELECTINTERET {
  SimulatorData: SimulatorData;
  onChangeSimulatorStatus: (type: "month", month: number) => void;
}

const SelectInteret: React.FC<SELECTINTERET> = ({
  SimulatorData,
  onChangeSimulatorStatus,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      onChangeSimulatorStatus("month", newValue);
      setValue(newValue);
    }
  };

  return (
    <Slider
      aria-label="Restricted values"
      onChange={handleChange}
      step={1}
      min={3}
      max={36}
      valueLabelDisplay="auto"
      marks
      value={value}
      sx={{ height: "7px" }}
    />
  );
};

export default SelectInteret;
