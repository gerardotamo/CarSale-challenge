import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { HeaderListCar } from "../../components/HeaderListCar/HeaderListCar";
import { NotFoundItem } from "../../components/NotFoundItem/NotFoundItem";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { useFindCar } from "../../shared/graphql/request/carRequest";
import { Cars } from "../../shared/graphql/__generate__/generated";
import { SkeletonCar } from "../../components/Skeleton/SkeletonCar";
import * as styled from "./styled";

export const FavoritesCars = () => {
  const { data, loading, errorRequest, findCars } = useFindCar();
  const [searchParams] = useSearchParams();
  const { state } = useGeneralContext();

  useEffect(() => {
    const search = searchParams.get("search");
    const orderByYear = searchParams.get("orderByYear");
    const orderBySaleDate = searchParams.get("orderBySaleDate");
    try {
      findCars(search, orderByYear, orderBySaleDate, state.auth.admin.id);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams, state.auth.admin.id, findCars]);

  if (errorRequest) {
    return (
      <styled.Container>
        <styled.Title color="red">{errorRequest.message}</styled.Title>
      </styled.Container>
    );
  }
  console.log(data);
  return (
    <styled.Container>
      <HeaderListCar />
      {!loading ? (
        data?.user_cars.length === 0 ? (
          <NotFoundItem />
        ) : (
          data?.cars.map((item: Cars, index: number) => {
            return (
              <CardItem
                data={item}
                key={index}
                favorite_cars={data.user_cars}
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
