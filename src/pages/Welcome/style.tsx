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
    position: absolute;
    right: 0;
    top: 0;
    
`
