import * as styled from "./styled";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  FieldErrorsImpl,
} from "react-hook-form";
import { Cities, States } from "../../shared/graphql/__generate__/generated";
import { useEffect, useState } from "react";
import { IFormInput } from "./ViewCreateCar";
import SelectForm from "../../components/Select/Select";
import { MyOption } from "../../shared/types/MyOptions";
import { useFindCity } from "../../shared/graphql/request/cityRequest";
import { registerOptions } from "../../shared/utils/validatios";

type City = Pick<Cities, "id" | "name">;

interface PropsCities {
  state: Pick<City, "id" | "name">[];
  isDisable: boolean;
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
}

const SelectState = (props: PropsCities) => {
  const state = props.state.map((item) => {
    return { value: item.id, label: item.name };
  });
  const { findCity, data, loading, errorRequest } = useFindCity();

  const [cities, setCities] = useState<MyOption[]>([]);

  const handleChangeState = (option: MyOption | null) => {
    if (option) {
      props.setValue("state_id", option.value);
      setCities([]);
      findCity(option.value);
      props.setValue("city_id", "");
    }
  };
  const handleChangeCity = (option: MyOption | null) => {
    if (option) {
      props.setValue("city_id", option.value);
    }
  };

  useEffect(() => {
    if (data) {
      setCities(
        data.cities.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    }
  }, [data]);

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption>Select State</styled.HeaderOption>
        <div {...props.register("state_id", registerOptions.state_id)}>
          <SelectForm
            options={state}
            onChange={handleChangeState}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props.errors.brand_id && props.errors.brand_id.message}
          </styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption>Select City</styled.HeaderOption>
        <div {...props.register("city_id", registerOptions.city_id)}>
          <SelectForm
            options={cities}
            onChange={handleChangeCity}
            isLoading={loading}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props.errors.city_id && props.errors.city_id.message}
          </styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
    </>
  );
};

export default SelectState;
