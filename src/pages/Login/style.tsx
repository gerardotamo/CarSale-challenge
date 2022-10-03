import { BaseColor } from '../../config/color';
import styled from 'styled-components';

export const Container = styled('div')`
  background: ${BaseColor.blackSecondaryColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
