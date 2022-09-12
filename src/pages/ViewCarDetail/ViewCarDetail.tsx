import { useParams } from "react-router-dom";
import * as styled from "./styled";

export const ViewCarDetail = () => {
  const { carId } = useParams();

  return <styled.Container>ViewCarDetail {carId}</styled.Container>;
};
