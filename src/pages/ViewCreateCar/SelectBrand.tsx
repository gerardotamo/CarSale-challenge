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
import { useState } from "react";
import { IFormInput } from "./ViewCreateCar";
import SelectForm from "../../components/Select/Select";
import { ActionMeta } from "react-select";

type Model = Pick<Models, "id" | "name">;
type Brands = Pick<Brands_Insert_Input, "name"> & {
  models: Model[];
  id: number;
};
type MyOption = { label: InputMaybe<string> | undefined; value: number };
interface PropsBrands {
  brands: Brands[];
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectBrand = (props: PropsBrands) => {
  const brands = props.brands;
  const aux: MyOption[] = props.brands.map((item) => {
    return { value: item.id, label: item.name };
  });

  console.log(aux);
  const [models, setModels] = useState<Model[] | undefined>([]);

  const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const model = brands.find(
      (brand) => brand.id === parseInt(event.target.value)
    )?.models;
    setModels(model ? model : []);
    props.setValue("model_id", "");
  };

  const change = (
    option: MyOption | null,
    actionMeta: ActionMeta<MyOption>
  ) => {
    console.log(option?.value);
    if (option) {
      props.setValue("brand_id", option.value);
    }
  };

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption>Select Brand</styled.HeaderOption>
        {brands && (
          <>
            <div {...props.register("brand_id")}>
              <SelectForm options={aux} onChange={change} />
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
        {models && (
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
        )}
      </styled.EntryGroup>
    </>
  );
};

export default SelectBrand;
