import * as styled from "./styled";
import { useEffect, useState } from "react";
import SelectForm from "../../components/Select/Select";
import { MyOption } from "../../shared/types/MyOptions";
import { useFindCity } from "../../shared/graphql/request/cityRequest";
import { registerOptions } from "../../shared/utils/validatios";
import { SelectProps } from "../../shared/types/SelectProps";

type PropsCities = Omit<SelectProps, "brands" | "colors">;

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
      props.clearErrors("state_id");
    }
  };
  const handleChangeCity = (option: MyOption | null) => {
    if (option) {
      props.setValue("city_id", option.value);
      props.clearErrors("city_id");
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
            {props.errors.state_id && props.errors.state_id.message}
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
