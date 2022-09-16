import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import Delorean from "../../shared/assets/images/delorean.jpg";
import { BaseColor } from "../../config/color";
import { Cars, User_Cars } from "../../shared/graphql/__generate__/generated";
import Button from "../Button/Button";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddFavoriteCar,
  useRemoveFavoriteCar,
} from "../../shared/graphql/request/carRequest";
import { addOneDay } from "../../shared/types/Date";
import ModalLoginVIew from "../Modal/Modal";

interface Props {
  data: Cars;
  favorite_cars: User_Cars[];
  showFavorites?: boolean;
}

export const CardItem = ({
  data,
  favorite_cars,
  showFavorites = false,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [favoriteCar, setFavoriteCar] = useState(
    favorite_cars.find((item) => item.car_id === data.id)
  );
  const { state } = useGeneralContext();
  const [isFavoriteCar, setIsFavoriteCar] = useState<boolean>(
    favoriteCar !== undefined && state.auth.admin.uuid
  );
  const { addFavoriteCar, loadingAddFavorite, errorAddFavorite, addData } =
    useAddFavoriteCar();
  const { removeFavoriteCar, loadingRemoveFavorite, errorRemoveFavorite } =
    useRemoveFavoriteCar();
  //const navigate = useNavigate();

  useEffect(() => {
    if (addData) {
      setFavoriteCar(addData.insert_user_cars_one);
    }
  }, [addData]);

  useEffect(() => {
    if (state.auth.admin.uuid) {
      setOpenModal(false);
      const fav = favorite_cars.find((item) => item.car_id === data.id);
      setFavoriteCar(fav);
      setIsFavoriteCar(fav !== undefined);
    } else {
      setIsFavoriteCar(false);
    }
  }, [state]);

  if (showFavorites && !isFavoriteCar) {
    return null;
  }

  const handleFavoriteButton = async () => {
    if (!state.auth.admin.uuid) {
      return handleOpenModal();
    }

    try {
      if (isFavoriteCar && favoriteCar) {
        //setIsFavoriteCar(false);
        removeFavoriteCar(favoriteCar.id, state.auth.admin.id);
        setIsFavoriteCar(false);
      } else {
        addFavoriteCar(data.id, state.auth.admin.id);
        setIsFavoriteCar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = new Date();
  const saleDate = new Date(data.sale_date);

  const ColorDate =
    saleDate > date
      ? BaseColor.lightBluePrimaryColor
      : addOneDay(data.sale_date) > date
      ? BaseColor.warningColor
      : BaseColor.redPrimaryColor;

  return (
    <Container>
      {data && (
        <>
          <Image src={Delorean} />
          <InfoContainer>
            <Link to={"/cars/" + data.id}>
              <Title color={BaseColor.lightBluePrimaryColor}>
                {data.title}
              </Title>
            </Link>
            <Section>
              <InfoItem>Batch number</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.batch}
              </SubInfoItem>
            </Section>
            <Section>
              <AddFavoriteBUtton
                onClick={handleFavoriteButton}
                disable={false}
                //disable={loadingAddFavorite || loadingRemoveFavorite}
              >
                {isFavoriteCar ? "Remove Favorite" : "Add Favorite"}
              </AddFavoriteBUtton>
              {(errorAddFavorite || errorRemoveFavorite) && (
                <ErrorMessage>
                  {errorAddFavorite
                    ? errorAddFavorite.message
                    : errorRemoveFavorite
                    ? errorRemoveFavorite.message
                    : "Error"}
                </ErrorMessage>
              )}
            </Section>
          </InfoContainer>
          <InfoContainer>
            <Section>
              <InfoItem>Odometer</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.odometer}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Year</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.year}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Price</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.price}
              </SubInfoItem>
            </Section>
          </InfoContainer>
          <InfoContainer>
            <InfoItem>
              {data.condition === "A"
                ? "Salvage title"
                : data.condition === "N"
                ? "New"
                : "Other"}
            </InfoItem>
          </InfoContainer>
          <InfoContainer>
            <Section>
              <InfoItem>City</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.city.name}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>State</InfoItem>
              <SubInfoItem color={BaseColor.lightBluePrimaryColor}>
                {data.city.state.name}
              </SubInfoItem>
            </Section>
            <Section>
              <InfoItem>Sale Date</InfoItem>
              <SubInfoItem color={ColorDate}>{data.sale_date}</SubInfoItem>
            </Section>
          </InfoContainer>
        </>
      )}
      <ModalLoginVIew open={openModal} modalClose={handleCloseModal} />
    </Container>
  );
};

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  margin-top: 20px;
  margin: 30px;
  align-items: center;
  padding-block: 10px;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 32%);
  border-radius: 5px 0 0 5px;
  :hover {
    background-color: ${BaseColor.primaryGrayColor};
  }
`;

const Image = styled("img")`
  height: 116px;
  width: 155px;
`;

const Title = styled("h1")<{ color: string }>`
  margin: 0;
  font-size: 18px;
  color: ${(props) => props.color};
`;
const InfoItem = styled("h2")<{ color?: string }>`
  margin: 0;
  color: ${(props) => props.color};
  font-size: 15px;
`;
const SubInfoItem = styled("h3")<{ color?: string }>`
  margin: 0;
  color: ${(props) => props.color && props.color};
  font-size: 10px;
`;

const InfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const AddFavoriteBUtton = styled(Button)<{ disable: boolean }>`
  cursor: ${(props) => (props.disable ? "wait" : "pointer")};
  height: 25px;
`;

const Section = styled("div")``;

const ErrorMessage = styled("small")`
  color: red;
`;
