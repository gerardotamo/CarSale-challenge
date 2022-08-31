import styled from 'styled-components';
import { BaseColor } from '../../config/color';

export const Container = styled('div')`
    background: ${BaseColor.blackSecondaryColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Title = styled('h1')`
    color: ${BaseColor.lightBluePrimaryColor};
`