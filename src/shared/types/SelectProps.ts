import {
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IFormInput } from "../../pages/ViewCreateCar/ViewCreateCar";
import {
  Brands_Insert_Input,
  Cities,
  Colors,
  Models,
} from "../graphql/__generate__/generated";

type Model = Pick<Models, "id" | "name">;
type Brands = Pick<Brands_Insert_Input, "name"> & {
  models: Model[];
  id: number;
};

export interface SelectProps {
  brands: Brands[];
  colors: Pick<Colors, "id" | "name">[];
  state: Pick<Cities, "id" | "name">[];
  isDisable: boolean;
  register: UseFormRegister<IFormInput>;
  getValue: UseFormGetValues<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
  clearErrors: UseFormClearErrors<IFormInput>;
}
