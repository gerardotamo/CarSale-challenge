import * as styled from './styled';

import {
  useFindCar,
  useGetCarFavorite,
} from '../../shared/graphql/request/carRequest';

import { CardItem } from '../../components/CardItem/CardItem';
import { Cars } from '../../shared/graphql/__generate__/generated';
import { HeaderListCar } from '../../components/HeaderListCar/HeaderListCar';
import { NotFoundItem } from '../../components/NotFoundItem/NotFoundItem';
import { SkeletonCar } from '../../components/Skeleton/SkeletonCar';
import { useEffect } from 'react';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';
import { useSearchParams } from 'react-router-dom';

export const FavoritesCars = () => {
  const { data, loading, errorRequest, findCars } = useFindCar();
  const {
    data: favoriteCar,
    loading: loadingFavoriteCar,
    findFavoritesCars,
  } = useGetCarFavorite();
  const [searchParams] = useSearchParams();
  const { state } = useGeneralContext();

  useEffect(() => {
    const search = searchParams.get('search');
    const orderByYear = searchParams.get('orderByYear');
    const orderBySaleDate = searchParams.get('orderBySaleDate');
    try {
      findCars(search, orderByYear, orderBySaleDate);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      findFavoritesCars(state.auth.admin.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (errorRequest) {
    return (
      <styled.Container>
        <styled.Title color="red">{errorRequest.message}</styled.Title>
      </styled.Container>
    );
  }
  return (
    <styled.Container>
      <HeaderListCar />
      {!loading && !loadingFavoriteCar ? (
        favoriteCar && favoriteCar.user_cars.length === 0 ? (
          <NotFoundItem />
        ) : (
          favoriteCar &&
          data?.cars.map((item: Cars, index: number) => {
            return (
              <CardItem
                data={item}
                key={index}
                favorite_cars={favoriteCar.user_cars}
                showFavorites={true}
              />
            );
          })
        )
      ) : (
        <SkeletonCar quantity={3} />
      )}
    </styled.Container>
  );
};
