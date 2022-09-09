import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { HeaderListCar } from "../../components/HeaderListCar/HeaderListCar";
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
  //const { data, loading, error } = useQuery(ALL_CARS);
  const { data, loading, errorRequest, findCars } = useFindCar();
  const [searchParams] = useSearchParams();

  //const {} = useFind_CarLazyQuery();

  useEffect(() => {
    const search = searchParams.get("search");
    const orderByYear = searchParams.get("orderByYear");
    const orderBySaleDate = searchParams.get("orderBySaleDate");
    //const lazy = useCarLazyQuery();
    if (search !== null) {
      findCars(search, orderByYear, orderBySaleDate);
    } else {
      findCars("", orderByYear, orderBySaleDate);
    }
  }, [searchParams]);

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
