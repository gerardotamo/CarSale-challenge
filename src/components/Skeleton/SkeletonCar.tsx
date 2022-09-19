import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { BaseColor } from '../../config/color';
import styled from 'styled-components';

export const SkeletonCar = ({ quantity }: { quantity: number }) => {
  const quant = Array.from(Array(quantity));
  return (
    <>
      {quant.map((item, id) => {
        return (
          <Container key={id}>
            <SkeletonTheme
              baseColor={BaseColor.blueDarkColor}
              highlightColor={BaseColor.lightBluePrimaryColor}
            >
              <Skeleton width={155} height={116} />
              <InfoContainer>
                <Skeleton width={120} />
                <Section>
                  <Skeleton width={100} />
                  <Skeleton width={180} height={10} />
                </Section>
                <Skeleton width={120} />
              </InfoContainer>
              <InfoContainer>
                <Section>
                  <Skeleton width={80} />
                  <Skeleton width={50} height={10} />
                </Section>
                <Section>
                  <Skeleton width={80} />
                  <Skeleton width={50} height={10} />
                </Section>
              </InfoContainer>
              <Skeleton width={70} />
              <InfoContainer>
                <Section>
                  <Skeleton width={50} />
                  <Skeleton width={30} height={10} />
                </Section>
                <Section>
                  <Skeleton width={50} />
                  <Skeleton width={30} height={10} />
                </Section>
              </InfoContainer>
            </SkeletonTheme>
          </Container>
        );
      })}
    </>
  );
};

const Container = styled('div')`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  margin-top: 20px;
  margin: 30px;
  align-items: center;
  padding-block: 10px;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 32%);
  border-radius: 5px 0 0 5px;
  :hover {
    background-color: ${BaseColor.primaryGrayColor};
  }
`;

const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const Section = styled('div')``;
