import * as styled from './styled';

import React, { useState } from 'react';

import { SelectProps } from '../../shared/types/SelectProps';

type PropsDatePicker = Pick<SelectProps, 'setValue' | 'register' | 'isDisable'>;

const SelectDateTime = (props: PropsDatePicker) => {
  const date =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() < 9
      ? '0' + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    '-' +
    (new Date().getDate() < 10
      ? '0' + new Date().getDate()
      : new Date().getDate());

  const [dateValue, setDateValue] = useState(date);

  const handleChangeSaleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.setValue('sale_date', event.target.value);
    setDateValue(event.target.value);
  };

  return (
    <styled.EntryGroup data-testid="date-picker">
      <styled.HeaderOption>Select Sale Date</styled.HeaderOption>
      <styled.DatePicker
        {...props.register('sale_date')}
        type="date"
        min={date}
        value={dateValue}
        onChange={handleChangeSaleDate}
        disabled={props.isDisable}
      />
    </styled.EntryGroup>
  );
};

export default SelectDateTime;
