import { BaseColor } from '../../config/color';
import styled from 'styled-components';
interface ButtonInterface {
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
  color?: string;
  disable?: boolean;
}

const Button = styled('button')<ButtonInterface>`
  background-color: ${props =>
    props.backgroundColor
      ? props.backgroundColor
      : BaseColor.blackSecondaryColor};
  cursor: pointer;
  margin: 5px;
  height: calc(20px + 2vmin);
  width: calc(120px + 2vmin);
  border-radius: ${props => (props.border ? props.border : '0px')};
  color: ${props => (props.color ? props.color : BaseColor.whiteColor)};
  border-color: ${props =>
    props.borderColor ? props.borderColor : BaseColor.lightBluePrimaryColor};

  :hover {
    background-color: ${props =>
      props.disable ? '' : BaseColor.lightBluePrimaryColor};
    color: ${props => (props.disable ? '' : BaseColor.whiteColor)};
  }
`;

export default Button;
