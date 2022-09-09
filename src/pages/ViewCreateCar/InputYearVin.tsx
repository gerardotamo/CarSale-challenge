import { SelectProps } from "../../shared/types/SelectProps";
import { registerOptions } from "../../shared/utils/validatios";
import * as styled from "./styled";

type Props = Pick<SelectProps, "errors" | "register">;

export const InputYearVin = (props: Props) => {
  return (
    <styled.GroupOptions>
      <styled.EntryGroup>
        <styled.HeaderOption>VIN</styled.HeaderOption>
        <styled.TextInput
          {...props.register("vin", registerOptions.vin)}
          type={"text"}
        />
        <styled.ErrorMessage>
          {props.errors.vin && props.errors.vin.message}
        </styled.ErrorMessage>
      </styled.EntryGroup>

      <styled.EntryGroup>
        <styled.HeaderOption>Salect year for car</styled.HeaderOption>
        <styled.TextInput
          {...props.register("year", registerOptions.year)}
          type="number"
          placeholder="year"
          min="1940"
          max={new Date().getFullYear()}
        />
        <styled.ErrorMessage>
          {props.errors.year && props.errors.year.message}
        </styled.ErrorMessage>
      </styled.EntryGroup>
    </styled.GroupOptions>
  );
};
