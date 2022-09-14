import * as styled from "./styled";
import { useEffect, useState } from "react";
import SelectForm from "../../components/Select/Select";
import { useFindModel } from "../../shared/graphql/request/modelRequest";
import { MyOption } from "../../shared/types/MyOptions";
import { registerOptions } from "../../shared/utils/validatios";
import { SelectProps } from "../../shared/types/SelectProps";

type PropsBrands = Omit<SelectProps, "colors" | "state">;

const SelectBrand = (props: PropsBrands) => {
  const brands = props.brands?.map((item) => {
    return { value: item.id, label: item.name };
  });
  const { findModel, data, loading, errorRequest } = useFindModel();

  const [models, setModels] = useState<MyOption[]>([]);

  const handleChangeBrand = async (option: MyOption | null) => {
    if (option) {
      props.setValue("brand_id", option.value);
      props.setValue("title", option.label);
      setModels([]);
      props.setValue("model_id", "");
      try {
        await findModel(option.value);
      } catch (error) {
        console.log(error);
      }
      props.clearErrors("brand_id");
    }
  };
  const handleChangeModel = async (option: MyOption | null) => {
    if (option) {
      props.setValue("model_id", option.value);
      props.setValue("title", props.getValue("title") + " " + option.label);
      props.clearErrors("model_id");
    }
  };

  useEffect(() => {
    if (data) {
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
            <div {...props.register("brand_id", registerOptions.brand_id)}>
              <SelectForm
                options={brands}
                onChange={handleChangeBrand}
                isDisable={props.isDisable}
              />
              <styled.ErrorMessage>
                {props.errors.brand_id && props.errors.brand_id.message}
              </styled.ErrorMessage>
            </div>
          </>
        )}
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption>Select Model</styled.HeaderOption>
        <div {...props.register("model_id", registerOptions.model_id)}>
          <SelectForm
            options={models}
            onChange={handleChangeModel}
            isLoading={loading}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props.errors.model_id && props.errors.model_id.message}
          </styled.ErrorMessage>
          <styled.ErrorMessage>
            {errorRequest && errorRequest.message}
          </styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
    </>
  );
};

export default SelectBrand;
