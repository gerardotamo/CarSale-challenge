import * as styled from "./styled";
import Slider from "@mui/material/Slider";

import { useState } from "react";
import { BaseColor } from "../../config/color";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormInput } from "./ViewCreateCar";
interface PropsPrice {
  isDisable: boolean;
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectPrice = (props: PropsPrice) => {
  const [priceValue, setPriceValue] = useState<
    number | string | Array<number | string>
  >(1500);
  const valueMax = 100000;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    props.setValue("price", newValue);
    setPriceValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue("price", Number(event.target.value));
    setPriceValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (priceValue < 0) {
      setPriceValue(0);
      props.setValue("price", 0);
    } else if (priceValue > valueMax) {
      setPriceValue(valueMax);
      props.setValue("price", valueMax);
    }
  };

  return (
    <styled.EntryGroup>
      <styled.Label>Select Price ($) </styled.Label>
      <styled.SelectOdo>
        <Slider
          size="small"
          value={typeof priceValue === "number" ? priceValue : 0}
          aria-label="Default"
          max={valueMax}
          onChange={handleSliderChange}
          disabled={props.isDisable}
        />
        <styled.Input
          {...props.register("price")}
          value={priceValue}
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
          disabled={props.isDisable}
        />
      </styled.SelectOdo>
    </styled.EntryGroup>
  );
};

export default SelectPrice;
