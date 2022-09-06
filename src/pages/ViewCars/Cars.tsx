import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { ALL_CARS } from "../../shared/graphql/query/carQuery";
import { useFindCar } from "../../shared/graphql/request/carRequest";
import { Cars } from "../../shared/graphql/__generate__/generated";
import { SkeletonCar } from "./SkeletonCar";
import * as styled from "./styled";

export const ViewCars = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  //const { data, loading, error } = useQuery(ALL_CARS);
  const { data, loading, errorRequest, findCars } = useFindCar();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search !== null) {
      findCars(search);
    } else {
      findCars("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      console.log(data.cars);
      setCars(data.cars);
    }
  }, [loading]);

  return (
    <styled.Container>
      <Header />
      {!loading
        ? cars.map((item, index) => {
            return <CardItem data={item} key={index} />;
          })
        : [{}, {}].map((item, index) => {
            return <SkeletonCar key={index} />;
          })}
    </styled.Container>
  );
};

const Header = () => {
  return (
    <styled.TableContainer>
      <styled.Title color="white">Image</styled.Title>
      <styled.Title color="white">Lot Info</styled.Title>
      <styled.Title color="white">Vehicle info</styled.Title>
      <styled.Title color="white">Condition</styled.Title>
      <styled.Title color="white">Sale Info</styled.Title>
    </styled.TableContainer>
  );
};
