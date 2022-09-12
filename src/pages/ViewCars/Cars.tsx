import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { HeaderListCar } from "../../components/HeaderListCar/HeaderListCar";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { ALL_CARS } from "../../shared/graphql/query/carQuery";
import { useFindCar } from "../../shared/graphql/request/carRequest";
import { Cars } from "../../shared/graphql/__generate__/generated";
import { SkeletonCar } from "./SkeletonCar";
import * as styled from "./styled";
import NoResultsFound from "../../shared/assets/images/no_results_found.png";

export const ViewCars = () => {
  const { data, loading, errorRequest, findCars } = useFindCar();
  const [searchParams] = useSearchParams();
  const { state } = useGeneralContext();

  useEffect(() => {
    const search = searchParams.get("search");
    const orderByYear = searchParams.get("orderByYear");
    const orderBySaleDate = searchParams.get("orderBySaleDate");
    if (search !== null) {
      findCars(search, orderByYear, orderBySaleDate, state.auth.admin.id);
    } else {
      findCars("", orderByYear, orderBySaleDate, state.auth.admin.id);
    }
  }, [searchParams]);

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
      {!loading ? (
        data?.length === 0 ? (
          <styled.Image src={NoResultsFound} />
        ) : (
          data?.cars.map((item: Cars, index: number) => {
            return (
              <CardItem
                data={item}
                key={index}
                favorite_cars={data.user_cars}
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
