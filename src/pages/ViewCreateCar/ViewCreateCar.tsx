import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMultiple_QueryQuery } from "../../shared/graphql/__generate__/generated";
import SelectBrand from "./SelectBrand";
import SelectState from "./SelectState";
import SelectColor from "./SelectColor";
import * as styled from "./styled";
import SelectDateTime from "./SelectDateTime";
import SelectOdometer from "./SelectOdometer";
import SelectPrice from "./SelectPrice";
import { useAddCar } from "../../shared/graphql/request/carRequest";

export interface IFormInput {
  brand_id: number | string;
  model_id: number | string;
  city_id: number | string;
  state_id: number | string;
  color_id: number | string;
  condition: string;
  vin: string;
  sale_date: string;
  odometer: number | number[];
  price: number | number[];
  year: number;
  uuid: string;
  title: string | null | undefined;
}

const ViewCreateCar = () => {
  const { data, loading, error } = useMultiple_QueryQuery();
  const { addCarOne, dataAdd, loadingADdCar, errorRequest } = useAddCar();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });
  const [odometer, setOdometer] = useState();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const title = getValues("title")?.includes(getValues("year").toString())
      ? getValues("title")
      : getValues("title") + " " + getValues("year");

    data = {
      ...data,
      title: title,
    };
    console.log(data);
    /*try {
      const newCar = await addCarOne(data);
      console.log("NEW CAR", newCar);
    } catch (error) {
      console.log(error);
    }*/
  };

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
                errors={errors}
              />

              <SelectState
                state={data.states}
                getValue={getValues}
                setValue={setValue}
                register={register}
                errors={errors}
              />

              <SelectColor
                colors={data.colors}
                register={register}
                setValue={setValue}
              />

              <styled.GroupOptions>
                <styled.EntryGroup>
                  <styled.HeaderOption>VIN</styled.HeaderOption>
                  <styled.TextInput {...register("vin")} type={"text"} />
                </styled.EntryGroup>

                <styled.EntryGroup>
                  <styled.HeaderOption>Salect year for car</styled.HeaderOption>
                  <styled.TextInput
                    {...register("year")}
                    type="number"
                    placeholder="year"
                    min="1940"
                    max={new Date().getFullYear()}
                  />
                </styled.EntryGroup>
              </styled.GroupOptions>

              <SelectDateTime register={register} setValue={setValue} />
              <SelectOdometer register={register} setValue={setValue} />
              <SelectPrice register={register} setValue={setValue} />

              <styled.EntryGroup>
                <styled.HeaderOption>Select Condition</styled.HeaderOption>
                <styled.RadioButtonGroup {...register("condition")}>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"A"}
                    name={"condition"}
                    checked
                  />
                  <styled.Label>Salvage Title</styled.Label>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"N"}
                    name={"condition"}
                  />
                  <styled.Label>New</styled.Label>
                </styled.RadioButtonGroup>
              </styled.EntryGroup>
            </>
          )}
          <input type="submit" />
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
