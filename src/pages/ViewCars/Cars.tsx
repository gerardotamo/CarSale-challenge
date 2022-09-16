import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { HeaderListCar } from "../../components/HeaderListCar/HeaderListCar";
import { NotFoundItem } from "../../components/NotFoundItem/NotFoundItem";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import {
  useFindCar,
  useGetCarFavorite,
} from "../../shared/graphql/request/carRequest";
import { Cars } from "../../shared/graphql/__generate__/generated";
import { SkeletonCar } from "../../components/Skeleton/SkeletonCar";
import * as styled from "./styled";
import { stat } from "fs";

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
    const search = searchParams.get("search");
    const orderByYear = searchParams.get("orderByYear");
    const orderBySaleDate = searchParams.get("orderBySaleDate");
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
      {!loading && !loadingFavoriteCar ? (
        data?.cars?.length === 0 ? (
          <NotFoundItem />
        ) : (
          data?.cars.map((item: Cars, index: number) => {
            return (
              <CardItem
                data={item}
                key={index}
                favorite_cars={favoriteCar ? favoriteCar.user_cars : []}
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
