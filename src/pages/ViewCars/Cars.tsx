import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { HeaderListCar } from "../../components/HeaderListCar/HeaderListCar";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { ALL_CARS } from "../../shared/graphql/query/carQuery";
import { useFindCar } from "../../shared/graphql/request/carRequest";
import {
  Cars,
  useCarLazyQuery,
  useFind_CarLazyQuery,
} from "../../shared/graphql/__generate__/generated";
import { SkeletonCar } from "./SkeletonCar";
import * as styled from "./styled";

export const ViewCars = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const { data, loading, errorRequest, findCars } = useFindCar();
  const [searchParams] = useSearchParams();
  const { state } = useGeneralContext();

  useEffect(() => {
    const search = searchParams.get("search");
    const orderByYear = searchParams.get("orderByYear");
    const orderBySaleDate = searchParams.get("orderBySaleDate");
    //const lazy = useCarLazyQuery();
    if (search !== null) {
      findCars(search, orderByYear, orderBySaleDate, state.auth.admin.id);
    } else {
      findCars("", orderByYear, orderBySaleDate, state.auth.admin.id);
    }
  }, [searchParams]);
  console.log(data);
  useEffect(() => {
    if (data) {
      console.log(data.cars);
      setCars(data.cars);
    }
  }, [loading, data]);

  return (
    <styled.Container>
      <HeaderListCar />
      {!loading ? (
        cars.map((item, index) => {
          return <CardItem data={item} key={index} />;
        })
      ) : (
        <SkeletonCar quantity={3} />
      )}
    </styled.Container>
  );
};
