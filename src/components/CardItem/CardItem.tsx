import 'react-loading-skeleton/dist/skeleton.css';

import { Cars, User_Cars } from '../../shared/graphql/__generate__/generated';

import { BaseColor } from '../../config/color';
import Delorean from '../../shared/assets/images/delorean.jpg';
import FavoriteButton from '../../pages/ViewCarDetail/FavoriteButton';
import { Link } from 'react-router-dom';
import { addOneDay } from '../../shared/types/Date';
import styled from 'styled-components';
import { useState } from 'react';

interface Props {
  data: Cars;
  favorite_cars: User_Cars[];
  showFavorites?: boolean;
  loadingFavoriteCar?: boolean;
}

export const CardItem = ({
  data,
  favorite_cars,
  showFavorites = false,
  loadingFavoriteCar = false,
}: Props) => {
  const favoriteCar = favorite_cars.find(item => item.car_id === data.id);

  const [isFavoriteCar, setIsFavoriteCar] = useState<boolean>(!!favoriteCar);

  if (showFavorites && !isFavoriteCar) {
    return null;
  }

  const removeCar = () => {
    setIsFavoriteCar(false);
  };

  const date = new Date();
  const saleDate = new Date(data.sale_date);

  const ColorDate =
    saleDate > date
      ? BaseColor.lightBluePrimaryColor
      : addOneDay(data.sale_date) > date
      ? BaseColor.warningColor
      : BaseColor.redPrimaryColor;

  return (
    <Container data-testid="car-item">
      {data && (
        <>
          <Image src={Delorean} />
          <InfoContainer>
            <Link
              to={'/cars/' + data.id}
              state={{ favoritesCars: favorite_cars }}
            >
              <Title color={BaseColor.lightBluePrimaryColor}>
                {data.title}
              </Title>
            </Link>
            <Section>
              <InfoItem>Batch number</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.batch}
              </SubInfoItem>
            </Section>
            <Section>
              <FavoriteButton
                carData={data}
                userCar={favorite_cars}
                loading={loadingFavoriteCar}
                removeCar={removeCar}
              />
            </Section>
          </InfoContainer>
          <InfoContainer>
            <Section>
              <InfoItem>Odometer</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.odometer}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Year</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.year}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Price</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.price}
              </SubInfoItem>
            </Section>
          </InfoContainer>
          <InfoContainer>
            <InfoItem>
              {data.condition === 'A'
                ? 'Salvage title'
                : data.condition === 'N'
                ? 'New'
                : 'Other'}
            </InfoItem>
          </InfoContainer>
          <InfoContainer>
            <Section>
              <InfoItem>City</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.city.name}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>State</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.city.state.name}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Sale Date</InfoItem>
              <SubInfoItem color={ColorDate}>{data.sale_date}</SubInfoItem>
            </Section>
          </InfoContainer>
        </>
      )}
    </Container>
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

const Image = styled('img')`
  height: 116px;
  width: 155px;
`;

const Title = styled('h1')<{ color: string }>`
  margin: 0;
  font-size: 18px;
  color: ${props => props.color};
`;
const InfoItem = styled('h2')<{ color?: string }>`
  margin: 0;
  color: ${props => props.color};
  font-size: 15px;
`;
const SubInfoItem = styled('h3')<{ color?: string }>`
  margin: 0;
  color: ${props => props.color && props.color};
  font-size: 10px;
`;

const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const Section = styled('div')``;
