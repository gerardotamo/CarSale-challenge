import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMultiple_QueryQuery } from "../../shared/graphql/__generate__/generated";
import SelectBrand from "./SelectBrand";
import SelectCity from "./SelectCity";
import SelectColor from "./SelectColor";
import * as styled from "./styled";

export interface IFormInput {
  brand_id: number | string;
  model_id: number | string;
  city_id: number | string;
  state_id: number | string;
  color_id: number | string;
}

const ViewCreateCar = () => {
  const { data, loading, error } = useMultiple_QueryQuery();
  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log(getValues("brand_id") === 0);
  console.log(getValues("brand_id"));
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

              <SelectCity
                cities={data.cities}
                getValue={getValues}
                setValue={setValue}
                register={register}
              />

              <SelectColor colors={data.colors} register={register} />
            </>
          )}
          <input type="submit" />
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
