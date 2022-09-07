import * as styled from "./styled";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { Cities, States } from "../../shared/graphql/__generate__/generated";
import { useState } from "react";
import { IFormInput } from "./ViewCreateCar";

type City = Pick<Cities, "id" | "name" | "state">;
type State = Pick<States, "id" | "name">;

interface PropsCities {
  cities: Pick<City, "id" | "name">[];
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectCity = (props: PropsCities) => {
  const cities = props.cities;
  const [state, setState] = useState<State | undefined>(undefined);

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const state = cities?.filter(
      (item) => item.id.toString() === event.target.value
    )[0];
    setState(state);
    props.setValue("state_id", "");
  };

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption>Select City</styled.HeaderOption>
        {cities && (
          <styled.Select
            {...props.register("city_id")}
            onChange={handleChangeCity}
          >
            <styled.Option value={""}>Select Value</styled.Option>
            {cities.map((item, id) => {
              return (
                <styled.Option value={item.id ? item.id : 0} key={id}>
                  {item.name}
                </styled.Option>
              );
            })}
          </styled.Select>
        )}
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption>Select State</styled.HeaderOption>
        {
          <styled.Select {...props.register("state_id")}>
            <styled.Option value={""}>Select Value</styled.Option>
            {state && (
              <styled.Option value={state.id}>{state.name}</styled.Option>
            )}
          </styled.Select>
        }
      </styled.EntryGroup>
    </>
  );
};

export default SelectCity;
