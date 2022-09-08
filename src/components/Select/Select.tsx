import Select, {
  ActionMeta,
  GroupBase,
  MenuProps,
  OptionsOrGroups,
  Props,
  StylesConfig,
} from "react-select";
import { BaseColor } from "../../config/color";
import { InputMaybe } from "../../shared/graphql/__generate__/generated";
type MyOption = { label: InputMaybe<string> | undefined; value: number };

interface PropsSelect {
  options: OptionsOrGroups<MyOption, GroupBase<MyOption>>;
  value?: number;
  onChange: (value: MyOption | null, actionMeta: ActionMeta<MyOption>) => void;
}

const customStyles: StylesConfig<MyOption, false, GroupBase<MyOption>> = {
  menu: (provided, state: any) => ({
    ...provided,
    //width: 200,
    borderBottom: "1px dotted pink",
    color: BaseColor.whiteColor,
    background: BaseColor.blueDarkColor,
  }),

  control: (_) => ({
    //width: 200,
    color: BaseColor.whiteColor,
    background: BaseColor.whiteColor,
    display: "flex",
    height: 30,
    padding: 0,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.2 : 1;
    const transition = "opacity 100s";

    return { ...provided, opacity, transition };
  },
  option: (styles, { isDisabled, isSelected, isFocused }) => {
    return {
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? BaseColor.lightBluePrimaryColor
        : isFocused
        ? BaseColor.bluePrimaryColor
        : undefined,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? BaseColor.primaryColor
            : BaseColor.lightBluePrimaryColor
          : undefined,
      },
      padding: 10,
    };
  },
};

const SelectForm = ({ options, onChange }: PropsSelect) => {
  return (
    <Select
      styles={customStyles}
      options={options}
      aria-labelledby="aria-label"
      onChange={onChange}
    />
  );
};

export default SelectForm;
