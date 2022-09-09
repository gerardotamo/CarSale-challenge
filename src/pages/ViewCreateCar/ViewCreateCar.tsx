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
import { InputYearVin } from "./InputYearVin";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

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
  const [isCarAdd, setIsCarAdd] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const title = getValues("title")?.includes(getValues("year").toString())
      ? getValues("title")
      : getValues("title") + " " + getValues("year");

    data = {
      ...data,
      title: title,
    };

    console.log(data);
    try {
      const newCar = await addCarOne(data);
    } catch (error) {
      console.log(error);
      console.log(errorRequest);
    }
  };

  useEffect(() => {
    if (dataAdd) {
      console.log("AGREGO");
      setIsCarAdd(true);
    }
  }, [dataAdd]);

  if (errorRequest) {
    return (
      <styled.Container>
        <styled.RegisterContainer>
          <styled.Title>{`Submission error! ${errorRequest.message}`}</styled.Title>
        </styled.RegisterContainer>
      </styled.Container>
    );
  }

  if (loading) {
    return (
      <styled.Container>
        <styled.RegisterContainer>
          <styled.Title>Loading...</styled.Title>
        </styled.RegisterContainer>
      </styled.Container>
    );
  }

  if (isCarAdd) {
    <styled.Container>
      <styled.RegisterContainer>
        <styled.Title>The car is Adding</styled.Title>
        <Link to={"cars"}>
          <Button>View Cars</Button>
        </Link>
      </styled.RegisterContainer>
    </styled.Container>;
  }

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
                isDisable={loadingADdCar}
                clearErrors={clearErrors}
              />

              <SelectState
                state={data.states}
                getValue={getValues}
                setValue={setValue}
                register={register}
                errors={errors}
                isDisable={loadingADdCar}
                clearErrors={clearErrors}
              />

              <SelectColor
                colors={data.colors}
                register={register}
                setValue={setValue}
                errors={errors}
                isDisable={loadingADdCar}
                clearErrors={clearErrors}
              />

              <InputYearVin register={register} errors={errors} />

              <SelectDateTime
                register={register}
                setValue={setValue}
                isDisable={loadingADdCar}
              />
              <SelectOdometer
                register={register}
                setValue={setValue}
                isDisable={loadingADdCar}
              />
              <SelectPrice
                register={register}
                setValue={setValue}
                isDisable={loadingADdCar}
              />

              <styled.EntryGroup>
                <styled.HeaderOption>Select Condition</styled.HeaderOption>
                <styled.RadioButtonGroup {...register("condition")}>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"A"}
                    name={"condition"}
                    checked
                    disabled={loadingADdCar}
                  />
                  <styled.Label>Salvage Title</styled.Label>
                  <styled.RadioButton
                    {...register("condition")}
                    type={"radio"}
                    value={"N"}
                    name={"condition"}
                    disabled={loadingADdCar}
                  />
                  <styled.Label>New</styled.Label>
                </styled.RadioButtonGroup>
              </styled.EntryGroup>
            </>
          )}
          <styled.ButtonCreate disable={loadingADdCar}>
            Send
          </styled.ButtonCreate>
        </styled.Form>
      </styled.RegisterContainer>
    </styled.Container>
  );
};

export default ViewCreateCar;
