import * as styled from './styled';

import { MyOption } from '../../shared/types/MyOptions';
import SelectForm from '../../components/Select/Select';
import { SelectProps } from '../../shared/types/SelectProps';
import { registerOptions } from '../../shared/utils/validatios';

type PropsCities = Omit<
  SelectProps,
  'brands' | 'cities' | 'getValue' | 'state'
>;

const SelectColor = (props: PropsCities) => {
  const colors = props.colors.map(item => {
    return { value: item.id, label: item.name };
  });

  const handleChangeColor = (option: MyOption | null) => {
    if (option) {
      props.setValue('color_id', option.value);
      props.clearErrors('color_id');
    }
  };

  return (
    <styled.EntryGroup>
      <styled.HeaderOption htmlFor="select">Select Color</styled.HeaderOption>
      <div
        data-testid="select"
        {...props.register('color_id', registerOptions.color_id)}
      >
        <SelectForm
          options={colors}
          onChange={handleChangeColor}
          isDisable={props.isDisable}
        />
        <styled.ErrorMessage>
          {props?.errors?.color_id?.message}
        </styled.ErrorMessage>
      </div>
    </styled.EntryGroup>
  );
};

export default SelectColor;
