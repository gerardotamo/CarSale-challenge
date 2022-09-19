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

export const ViewCars = () => {
  const { data, loading, errorRequest, findCars } = useFindCar();
  const {
    data: favoriteCar,
    loading: loadingFavoriteCar,
    errorFavoriteCars,
    findFavoritesCars,
  } = useGetCarFavorite();
  const [searchParams] = useSearchParams();
  const { state } = useGeneralContext();

  useEffect(() => {
    const search = searchParams.get('search');
    const orderByYear = searchParams.get('orderByYear');
    const orderBySaleDate = searchParams.get('orderBySaleDate');
    if (!state) {
      return;
    }
    try {
      findCars(search, orderByYear, orderBySaleDate);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (state.auth.admin.uuid) {
      try {
        findFavoritesCars(state.auth.admin.id);
      } catch (error) {
        console.log(error);
      }
    }
  }, [state]);

  if (errorRequest) {
    return (
      <styled.Container>
        <styled.Title color="red">{errorRequest.message}</styled.Title>
      </styled.Container>
    );
  }

  if (errorFavoriteCars) {
    return (
      <styled.Container>
        <styled.Title color="red">{errorFavoriteCars.message}</styled.Title>
      </styled.Container>
    );
  }

  return (
    <styled.Container>
      <HeaderListCar />
      {!loading ? (
        data?.cars?.length === 0 ? (
          <NotFoundItem />
        ) : (
          data?.cars.map((item: Cars, index: number) => {
            return (
              <CardItem
                data={item}
                key={index}
                favorite_cars={favoriteCar ? favoriteCar.user_cars : []}
                loadingFavoriteCar={loadingFavoriteCar}
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
