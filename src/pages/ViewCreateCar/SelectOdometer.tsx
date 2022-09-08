import * as styled from "./styled";
import Slider from "@mui/material/Slider";

import { useState } from "react";
import { BaseColor } from "../../config/color";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormInput } from "./ViewCreateCar";
interface PropsOdometer {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

export const SelectOdometer = (props: PropsOdometer) => {
  const [odometerValue, setOdometerValue] = useState<
    number | string | Array<number | string>
  >(10000);
  const valueMax = 100000;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    props.setValue("odometer", newValue);
    setOdometerValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue("odometer", Number(event.target.value));
    setOdometerValue(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (odometerValue < 0) {
      setOdometerValue(0);
      props.setValue("odometer", 0);
    } else if (odometerValue > valueMax) {
      setOdometerValue(valueMax);
      props.setValue("odometer", valueMax);
    }
  };

  return (
    <styled.EntryGroup>
      <styled.Label>Select Odometer</styled.Label>
      <styled.SelectOdo>
        <Slider
          size="small"
          value={typeof odometerValue === "number" ? odometerValue : 0}
          aria-label="Default"
          max={valueMax}
          onChange={handleSliderChange}
        />
        <styled.Input
          {...props.register("odometer")}
          value={odometerValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 0,
            max: valueMax,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          style={{
            borderBottomColor: BaseColor.whiteColor,
            color: BaseColor.whiteColor,
          }}
        />
      </styled.SelectOdo>
    </styled.EntryGroup>
  );
};
