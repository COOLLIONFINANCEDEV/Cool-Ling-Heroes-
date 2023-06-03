import * as React from "react";
import Slider from "@mui/material/Slider";
import { SimulatorData } from "../../Containers/Simulator";
interface SELECTINTERET {
  SimulatorData: SimulatorData;
  onChangeSimulatorStatus: (search: number, state: boolean) => void;
}

type marksItem = {
  value: number;
  key: number;
  label: string;
};

type MarksArray = Array<marksItem>;

const SelectInteret: React.FC<SELECTINTERET> = ({
  SimulatorData,
  onChangeSimulatorStatus,
}) => {
  const [marks, setMarks] = React.useState<MarksArray>();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let values = 0;
    const newMap: MarksArray = [];
    SimulatorData.map((item, key) => {
      const newObject: marksItem = {
        value: values,
        key: key,
        label: item.interet + " %",
      };
      newMap.push(newObject);
      values += 100 / (SimulatorData.length - 1);
    });
    setMarks(newMap);
  }, [SimulatorData]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    handleChangeSimulator(newValue);
  };

  const handleChangeSimulator = React.useCallback(
    (newValue: number | number[], auto = false) => {
      if (!auto) {
        const mark = marks?.filter((item) => item.value === newValue);
        if (mark) {
          onChangeSimulatorStatus(SimulatorData[mark[0].key].interet, true);
          if (typeof newValue === "number") {
            setValue(newValue);
          }
        }
      } else {
        const SimulatorItemTrue = SimulatorData.filter(
          (item) => item.status === true
        );
        const indexOf = SimulatorData.indexOf(SimulatorItemTrue[0]);
        if (SimulatorItemTrue) {
          const newValueBySimulator = marks?.filter(
            (item) => item.key === indexOf
          );
          if (newValueBySimulator) {
            setValue(newValueBySimulator[0].value);
          }
        }
      }
    },
    [SimulatorData, marks, onChangeSimulatorStatus]
  );

  React.useEffect(() => {
    handleChangeSimulator(1, true);
  }, [SimulatorData, handleChangeSimulator]);
  return (
    <Slider
      aria-label="Restricted values"
      defaultValue={0}
      onChange={handleChange}
      value={value}
      step={null}
      marks={marks}
      sx={{
        height: "20px !important",
      }}
    />
  );
};

export default SelectInteret;
