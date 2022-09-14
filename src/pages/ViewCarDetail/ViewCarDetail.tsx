import { useParams } from "react-router-dom";
import { useGetCar } from "../../shared/graphql/request/carRequest";
import * as styled from "./styled";
import Delorean from "../../shared/assets/images/delorean.jpg";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import FavoriteButton from "./FavoriteButton";
import SkeletonDetailCar from "../../components/Skeleton/SkeletonDetailCar";

export const ViewCarDetail = () => {
  const { carId } = useParams();
  const { state } = useGeneralContext();
  const { data, loading } = useGetCar(
    parseInt(carId ? carId : "0"),
    state.auth.admin.id
  );
  const car = data?.cars[0];

  //console.log(loading);

  return (
    <styled.Container>
      {loading ? (
        <SkeletonDetailCar />
      ) : (
        car && (
          <>
            <styled.Header>
              <styled.Title>{car.title}</styled.Title>
              <FavoriteButton carData={data.cars} userCar={data.user_cars} />
            </styled.Header>
            <styled.Column>
              <styled.Section>
                <styled.Image src={Delorean} />
              </styled.Section>
              <styled.DataContainer>
                <styled.InfoItem>
                  <styled.TextItem>VIN:</styled.TextItem>
                  <styled.TextItem>{car.vin}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Odometer:</styled.TextItem>
                  <styled.TextItem>{car.odometer} mi</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Color:</styled.TextItem>
                  <styled.TextItem>{car.color.name}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Brand</styled.TextItem>
                  <styled.TextItem>{car.brand.name}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Model</styled.TextItem>
                  <styled.TextItem>{car.model.name}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Condition</styled.TextItem>
                  <styled.TextItem>
                    {car.condition === "A" ? "Salvage Damage" : "New"}
                  </styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>State</styled.TextItem>
                  <styled.TextItem>{car.state.name}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>City</styled.TextItem>
                  <styled.TextItem>{car.city.name}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Price</styled.TextItem>
                  <styled.TextItem>{car.price}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Year</styled.TextItem>
                  <styled.TextItem>{car.year}</styled.TextItem>
                </styled.InfoItem>
                <styled.Divider />
                <styled.InfoItem>
                  <styled.TextItem>Saled Date</styled.TextItem>
                  <styled.TextItem>{car.sale_date}</styled.TextItem>
                </styled.InfoItem>
              </styled.DataContainer>
            </styled.Column>
          </>
        )
      )}
    </styled.Container>
  );
};
