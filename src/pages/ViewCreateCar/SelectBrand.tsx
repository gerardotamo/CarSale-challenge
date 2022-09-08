import * as styled from "./styled";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import {
  Brands_Insert_Input,
  InputMaybe,
  Models,
} from "../../shared/graphql/__generate__/generated";
import { useEffect, useState } from "react";
import { IFormInput } from "./ViewCreateCar";
import SelectForm from "../../components/Select/Select";
import { ActionMeta } from "react-select";
import { useFindModel } from "../../shared/graphql/request/modelRequest";
import { MyOption } from "../../shared/types/MyOptions";

type Model = Pick<Models, "id" | "name">;
type Brands = Pick<Brands_Insert_Input, "name"> & {
  models: Model[];
  id: number;
};
interface PropsBrands {
  brands: Brands[];
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectBrand = (props: PropsBrands) => {
  const brands = props.brands.map((item) => {
    return { value: item.id, label: item.name };
  });
  const { findModel, data, loading, errorRequest } = useFindModel();

  const [models, setModels] = useState<MyOption[]>([]);
  const handleChangeBrand = async (option: MyOption | null) => {
    console.log(option?.value);
    if (option) {
      props.setValue("brand_id", option.value);
      setModels([]);
      props.setValue("model_id", "");
      await findModel(option.value);
    }
  };
  const handleChangeModel = async (option: MyOption | null) => {
    if (option) {
      props.setValue("model_id", option.value);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data.models);
      setModels(
        data.models.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    }
  }, [data]);

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption>Select Brand</styled.HeaderOption>
        {brands && (
          <>
            <div {...props.register("brand_id")}>
              <SelectForm options={brands} onChange={handleChangeBrand} />
            </div>
            {/*<styled.Select
              {...props.register("brand_id")}
              onChange={handleChangeBrand}
            >
              <styled.Option value={""}> Select Value</styled.Option>
              {brands.map((item, id) => {
                return (
                  <styled.Option value={item.id ? item.id : 0} key={id}>
                    {item.name}
                  </styled.Option>
                );
              })}
            </styled.Select>*/}
          </>
        )}
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption>Select Model</styled.HeaderOption>
        <div {...props.register("model_id")}>
          <SelectForm
            options={models}
            onChange={handleChangeModel}
            isLoading={loading}
          />
        </div>
        {/*models && (
          <styled.Select {...props.register("model_id")}>
            <styled.Option value={""}> Select Value</styled.Option>
            {models.map((item) => {
              return (
                <styled.Option value={item.id} key={item.id}>
                  {item.name}
                </styled.Option>
              );
            })}
          </styled.Select>
          )*/}
      </styled.EntryGroup>
    </>
  );
};

export default SelectBrand;
