import * as styled from './styled';

import { MyOption } from '../../shared/types/MyOptions';
import SelectForm from '../../components/Select/Select';
import { SelectProps } from '../../shared/types/SelectProps';
import { registerOptions } from '../../shared/utils/validatios';
import { useFindCity } from '../../shared/graphql/request/cityRequest';

type PropsCities = Omit<SelectProps, 'brands' | 'colors'>;

const SelectState = (props: PropsCities) => {
  const state = props.state.map(item => {
    return { value: item.id, label: item.name };
  });
  const { findCity, data, loading, errorRequest } = useFindCity();

  const handleChangeState = (option: MyOption | null) => {
    if (option) {
      props.setValue('state_id', option.value);
      try {
        findCity(option.value);
      } catch (error) {
        console.log(error);
      }
      props.setValue('city_id', '');
      props.clearErrors('state_id');
    }
  };

  const handleChangeCity = (option: MyOption | null) => {
    if (option) {
      props.setValue('city_id', option.value);
      props.clearErrors('city_id');
    }
  };

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption htmlFor="select">Select State</styled.HeaderOption>
        <div
          data-testid="select"
          {...props.register('state_id', registerOptions.state_id)}
        >
          <SelectForm
            options={state}
            onChange={handleChangeState}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props?.errors?.state_id?.message}
          </styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption htmlFor="select">Select City</styled.HeaderOption>
        <div
          data-testid="select"
          {...props.register('city_id', registerOptions.city_id)}
        >
          <SelectForm
            options={
              data
                ? data.cities.map(item => {
                    return { value: item.id, label: item.name };
                  })
                : []
            }
            onChange={handleChangeCity}
            isLoading={loading}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props?.errors?.city_id?.message}
          </styled.ErrorMessage>
          <styled.ErrorMessage>{errorRequest?.message}</styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
    </>
  );
};

export default SelectState;
