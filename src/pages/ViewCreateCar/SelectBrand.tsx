import * as styled from './styled';

import { useEffect, useState } from 'react';

import { MyOption } from '../../shared/types/MyOptions';
import SelectForm from '../../components/Select/Select';
import { SelectProps } from '../../shared/types/SelectProps';
import { registerOptions } from '../../shared/utils/validatios';
import { useFindModel } from '../../shared/graphql/request/modelRequest';

type PropsBrands = Omit<SelectProps, 'colors' | 'state'>;

const SelectBrand = (props: PropsBrands) => {
  const brands = props.brands?.map(item => {
    return { value: item.id, label: item.name };
  });
  const { findModel, data, loading, errorRequest } = useFindModel();

  const [models, setModels] = useState<MyOption[]>([]);

  const handleChangeBrand = async (option: MyOption | null) => {
    if (option) {
      props.setValue('brand_id', option.value);
      props.setValue('title', option.label);
      setModels([]);
      props.setValue('model_id', '');
      try {
        await findModel(option.value);
      } catch (error) {
        console.log(error);
      }
      props.clearErrors('brand_id');
    }
  };
  const handleChangeModel = async (option: MyOption | null) => {
    if (option) {
      props.setValue('model_id', option.value);
      props.setValue('title', props.getValue('title') + ' ' + option.label);
      props.clearErrors('model_id');
    }
  };

  useEffect(() => {
    if (data) {
      setModels(
        data.models.map(item => {
          return { value: item.id, label: item.name };
        })
      );
    }
  }, [data]);

  return (
    <>
      <styled.EntryGroup>
        <styled.HeaderOption htmlFor="select">Select Brand</styled.HeaderOption>
        {brands && (
          <>
            <div
              data-testid="select"
              {...props.register('brand_id', registerOptions.brand_id)}
            >
              <SelectForm
                options={brands}
                onChange={handleChangeBrand}
                isDisable={props.isDisable}
              />
              <styled.ErrorMessage>
                {props?.errors?.brand_id?.message}
              </styled.ErrorMessage>
            </div>
          </>
        )}
      </styled.EntryGroup>
      <styled.EntryGroup>
        <styled.HeaderOption htmlFor="select">Select Model</styled.HeaderOption>
        <div
          data-testid="select"
          {...props.register('model_id', registerOptions.model_id)}
        >
          <SelectForm
            options={models}
            onChange={handleChangeModel}
            isLoading={loading}
            isDisable={props.isDisable}
          />
          <styled.ErrorMessage>
            {props?.errors?.model_id?.message}
          </styled.ErrorMessage>
          <styled.ErrorMessage>{errorRequest?.message}</styled.ErrorMessage>
        </div>
      </styled.EntryGroup>
    </>
  );
};

export default SelectBrand;
