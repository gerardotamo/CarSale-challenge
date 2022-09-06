import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ALL_BRANDS } from "../../shared/graphql/query/brandQuery";
import {
  Brands_Insert_Input,
  Cities,
  Models,
  States,
} from "../../shared/graphql/__generate__/generated";
import { multipleQuery } from "../../shared/graphql/query/multipleQuery";
import * as styled from "./styled";
import { ALL_CITIES } from "../../shared/graphql/query/cityQuery";

type Brands = Pick<Brands_Insert_Input, "name"> & {
  models: Models[];
  id: number;
};
type City = Pick<Cities, "id" | "name" | "state">;
type State = Pick<States, "id" | "name">;

interface IFormInput {
  brand_id: number;
  model_id: number;
  city_id: number;
  state_name: string;
}

interface PropsBrands {
  data: any;
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectBrand = (props: PropsBrands) => {
  const [brands, setBrands] = useState<Brands[] | undefined>();
  const [models, setModels] = useState<Models[]>();

  useEffect(() => {
    if (props.data) {
      setBrands(props.data.brands);
      setModels(props.data.brands[0].models);
    }
  }, [props.data]);

  const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const model = brands?.find(
      (brand) => brand.id === parseInt(event.target.value)
    )?.models;
    setModels(model);
    console.log(model);
    let model_id = -1;
    if (model && model.length > 0) {
      console.log("entra");
      model_id = model[0].id;
    }
    props.setValue("model_id", model_id);
  };

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption>Select Brand</styled.HeaderOption>
        {brands && (
          <styled.Select
            {...props.register("brand_id", {
              value: brands.length === 0 ? 0 : brands[0].id,
            })}
            onChange={handleChangeBrand}
          >
            {brands.map((item, id) => {
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
        <styled.HeaderOption>Select Model</styled.HeaderOption>
        {models && (
          <styled.Select
            {...props.register("model_id", {
              value: models.length > 0 ? models[0].id : 0,
            })}
          >
            {models.map((item) => {
              return (
                <styled.Option value={item.id} key={item.id}>
                  {item.name}
                </styled.Option>
              );
            })}
          </styled.Select>
        )}
      </styled.EntryGroup>
    </>
  );
};

const ViewCreateCar = () => {
  const { data, loading, error } = useQuery(
    multipleQuery([ALL_BRANDS, ALL_CITIES])
  );
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [cities, setCities] = useState<City[]>();
  const [state, setState] = useState<State>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  useEffect(() => {
    if (data) {
      setCities(data.cities);
      setState(data.cities[0].state);
    }
  }, [data]);

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const state = cities?.filter(
      (item) => item.id.toString() === event.target.value
    )[0];
    setState(state);
  };

  return (
    <styled.Container>
      <styled.RegisterContainer>
        <styled.Title>Create Car</styled.Title>
        <styled.Form onSubmit={handleSubmit(onSubmit)}>
          <SelectBrand data={data} register={register} setValue={setValue} />

          <styled.EntryGroup>
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
          </styled.EntryGroup>
          <input type="submit" />
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
