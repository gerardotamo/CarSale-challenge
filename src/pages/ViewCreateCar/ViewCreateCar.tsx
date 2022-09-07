import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Cities,
  States,
  useMultiple_QueryQuery,
} from "../../shared/graphql/__generate__/generated";
import SelectBrand from "./SelectBrand";
import * as styled from "./styled";

type City = Pick<Cities, "id" | "name" | "state">;
type State = Pick<States, "id" | "name">;

export interface IFormInput {
  brand_id: number | string;
  model_id: number | string;
  city_id: number;
  state_name: string;
}

const ViewCreateCar = () => {
  const { data, loading, error } = useMultiple_QueryQuery();
  /*const { data: asd, loading, error } = useQuery(
    multipleQuery([ALL_BRANDS, ALL_CITIES])
  );*/
  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>();
  const [cities, setCities] = useState<City[]>();
  const [state, setState] = useState<State>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  /*useEffect(() => {
    if (data) {
      setCities(data.cities);
      setState(data.cities[0].state);
    }
  }, [data]);*/
  const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const model = data?.brands.find(
      (brand) => brand.id === parseInt(event.target.value)
    )?.models;
    //setModels(model);
    console.log(model);
    let model_id = -1;
    if (model && model.length > 0) {
      console.log("entra");
      model_id = model[0].id;
    }
    setValue("brand_id", parseInt(event.target.value));
    //props.setValue("model_id", model_id);
    console.log("SLECT", getValues("brand_id"));
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const state = cities?.filter(
      (item) => item.id.toString() === event.target.value
    )[0];
    setState(state);
  };

  console.log(getValues("brand_id") === 0);
  console.log(getValues("brand_id"));
  return (
    <styled.Container>
      <styled.RegisterContainer>
        <styled.Title>Create Car</styled.Title>
        <styled.Form onSubmit={handleSubmit(onSubmit)}>
          {data && (
            <SelectBrand
              brands={data?.brands}
              getValue={getValues}
              register={register}
              setValue={setValue}
            />
          )}
          {/*<styled.EntryGroup>
            <styled.HeaderOption>Select City</styled.HeaderOption>
            {cities && (
              <styled.Select
                {...register("city_id", {
                  value: cities.length !== 0 ? cities[0].id : 0,
                })}
                onChange={handleChangeCity}
              >
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
            {state && (
              <styled.Select
                {...register("state_name", { value: state.name })}
                disabled
              >
                <styled.Option value={state.name}>{state.name}</styled.Option>
              </styled.Select>
            )}
            </styled.EntryGroup>*/}
          <input type="submit" />
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
