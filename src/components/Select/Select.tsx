import Select, {
  ActionMeta,
  GroupBase,
  OptionsOrGroups,
  StylesConfig,
} from 'react-select';

import { BaseColor } from '../../config/color';
import { MyOption } from '../../shared/types/MyOptions';

interface PropsSelect {
  options: OptionsOrGroups<MyOption, GroupBase<MyOption>>;
  value?: number;
  isLoading?: boolean;
  onChange: (value: MyOption | null, actionMeta: ActionMeta<MyOption>) => void;
  isDisable: boolean;
}

const customStyles: StylesConfig<MyOption, false, GroupBase<MyOption>> = {
  menu: (provided, state: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: BaseColor.whiteColor,
    background: BaseColor.blueDarkColor,
  }),

  control: _ => ({
    color: BaseColor.whiteColor,
    background: BaseColor.whiteColor,
    display: 'flex',
    height: 30,
    padding: 0,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.2 : 1;
    const transition = 'opacity 100s';

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
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
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

const SelectForm = ({
  options,
  onChange,
  isLoading,
  isDisable,
}: PropsSelect) => {
  return (
    <Select
      styles={customStyles}
      options={options}
      aria-labelledby="aria-label"
      onChange={onChange}
      isLoading={isLoading}
      noOptionsMessage={() => 'No Categories Found'}
      isDisabled={isDisable}
    />
  );
};

export default SelectForm;
