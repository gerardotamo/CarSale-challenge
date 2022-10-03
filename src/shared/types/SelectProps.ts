import { Brands, Cities, Colors } from '../graphql/__generate__/generated';
import {
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IFormInput } from '../../pages/ViewCreateCar/ViewCreateCar';

export interface SelectProps {
  brands: Omit<Brands, 'uuid' | 'cars_count'>[];
  colors: Pick<Colors, 'id' | 'name'>[];
  state: Pick<Cities, 'id' | 'name'>[];
  isDisable: boolean;
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
  clearErrors: UseFormClearErrors<IFormInput>;
}
