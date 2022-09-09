import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { MyOption } from "../../shared/types/MyOptions";
import * as styled from "./styled";
import { IFormInput } from "./ViewCreateCar";

interface PropsDatePicker {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectDateTime = (props: PropsDatePicker) => {
  const date =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() < 9
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate());

  const [dateValue, setDateValue] = useState(date);

  const handleChangeSaleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.setValue("sale_date", event.target.value);
    setDateValue(event.target.value);
  };

  return (
    <styled.EntryGroup>
      <styled.HeaderOption>Select Sale Date</styled.HeaderOption>
      <styled.DatePicker
        {...props.register("sale_date")}
        type="date"
        name=""
        id=""
        defaultValue={dateValue}
        min={date}
        value={date}
        onChange={handleChangeSaleDate}
      />
    </styled.EntryGroup>
  );
};

export default SelectDateTime;
