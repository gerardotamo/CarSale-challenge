import styled from 'styled-components';
import { BaseColor } from '../../config/color';

export const Container = styled('div')`
    background: ${BaseColor.fieldColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Section = styled("div")`
    right: 0;
    top: 0;
    display: flex;
    width: 100%;
    background-color: ${BaseColor.blueDarkColor};
    justify-content: flex-end;
`
export const SectionLogin = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const EmailText = styled('p')<{color?: string}>`
    margin: 0;
    font-size: 15px;
    color: ${props => props.color ? props.color : "white"};

`