import styled from "styled-components";
import { BaseColor } from "../../config/color";
interface ButtonInterface {
    backgroundColor?: string,
    border?: string,
    borderColor?: string,
    color?: string
}

const Button = styled('button')<ButtonInterface>`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : BaseColor.yellowPrimaryColor};
    cursor: pointer;
    margin: 5px;
    height: calc(20px + 2vmin);
    width: calc(120px + 2vmin);
    border: 0px;
    border-radius: ${props => props.border ? props.border : "0px"};
    color: ${props => props.color ? props.color : BaseColor.whiteColor};
`

export default Button;