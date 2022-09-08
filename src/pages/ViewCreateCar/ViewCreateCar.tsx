import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMultiple_QueryQuery } from "../../shared/graphql/__generate__/generated";
import SelectBrand from "./SelectBrand";
import SelectState from "./SelectState";
import SelectColor from "./SelectColor";
import * as styled from "./styled";
import SelectDateTime from "./SelectDateTime";

export interface IFormInput {
  brand_id: number | string;
  model_id: number | string;
  city_id: number | string;
  state_id: number | string;
  color_id: number | string;
  condition: string;
  vin: string;
  sale_date: string;
}

const ViewCreateCar = () => {
  const { data, loading, error } = useMultiple_QueryQuery();
  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>();
  const [odometer, setOdometer] = useState();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <styled.Container>
      <styled.RegisterContainer>
        <styled.Title>Create Car</styled.Title>
        <styled.Form onSubmit={handleSubmit(onSubmit)}>
          {data && (
            <>
              <SelectBrand
                brands={data?.brands}
                getValue={getValues}
                register={register}
                setValue={setValue}
              />

              <SelectState
                state={data.states}
                getValue={getValues}
                setValue={setValue}
                register={register}
              />

              <SelectColor
                colors={data.colors}
                register={register}
                setValue={setValue}
              />
              <styled.EntryGroup>
                <styled.HeaderOption>Select </styled.HeaderOption>
                <styled.RadioButtonGroup>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"A"}
                    name={"condition"}
                  />
                  <styled.Label>A</styled.Label>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"N"}
                    name={"condition"}
                  />
                  <styled.Label>New</styled.Label>
                </styled.RadioButtonGroup>
              </styled.EntryGroup>

              <styled.EntryGroup>
                <styled.HeaderOption>VIN</styled.HeaderOption>
                <styled.TextInput {...register("vin")} type={"text"} />
              </styled.EntryGroup>

              <SelectDateTime register={register} setValue={setValue} />
            </>
          )}
          <input type="submit" />
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
