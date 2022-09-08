import { Colors } from "../../shared/graphql/__generate__/generated";
import * as styled from "./styled";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormInput } from "./ViewCreateCar";
import SelectForm from "../../components/Select/Select";
import { MyOption } from "../../shared/types/MyOptions";

interface PropsCities {
  colors: Pick<Colors, "id" | "name">[];
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}

const SelectColor = (props: PropsCities) => {
  const colors = props.colors.map((item) => {
    return { value: item.id, label: item.name };
  });

  const handleChangeColor = (option: MyOption | null) => {
    if (option) {
      props.setValue("color_id", option.value);
    }
  };

  return (
    <styled.EntryGroup>
      <styled.HeaderOption>Select Color</styled.HeaderOption>
      <div {...props.register("color_id")}>
        <SelectForm options={colors} onChange={handleChangeColor} />
      </div>
    </styled.EntryGroup>
  );
};

export default SelectColor;
