import { Colors } from "../../shared/graphql/__generate__/generated";
import * as styled from "./styled";
import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "./ViewCreateCar";

interface PropsCities {
  colors: Pick<Colors, "id" | "name">[];
  register: UseFormRegister<IFormInput>;
}

const SelectColor = (props: PropsCities) => {
  const colors = props.colors;

  return (
    <styled.EntryGroup>
      <styled.HeaderOption>Select Color</styled.HeaderOption>
      {colors && (
        <styled.Select {...props.register("color_id")}>
          <styled.Option value={""}> Select Value</styled.Option>
          {colors.map((item, id) => {
            return (
              <styled.Option value={item.id ? item.id : 0} key={id}>
                {item.name}
              </styled.Option>
            );
          })}
        </styled.Select>
      )}
    </styled.EntryGroup>
  );
};

export default SelectColor;
