import { useEffect, useState } from "react";
import ModalLoginVIew from "../../components/Modal/Modal";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import {
  useAddFavoriteCar,
  useRemoveFavoriteCar,
} from "../../shared/graphql/request/carRequest";
import { Cars, User_Cars } from "../../shared/graphql/__generate__/generated";
import * as styled from "./styled";

interface PropsFavoriteButton {
  userCar: User_Cars[];
  carData: Cars[];
}

const FavoriteButton = ({ userCar, carData }: PropsFavoriteButton) => {
  const car = carData[0];
  const { state } = useGeneralContext();
  const [favoriteCar, setFavoriteCar] = useState(userCar[0]);
  const [isCarFavorite, setIsCarFavorite] = useState<boolean>(
    userCar.length !== 0 && state.auth.admin.id !== undefined
  );
  console.log(userCar);
  console.log(isCarFavorite);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { addFavoriteCar, loadingAddFavorite, errorAddFavorite, addData } =
    useAddFavoriteCar();
  const { removeFavoriteCar, loadingRemoveFavorite, errorRemoveFavorite } =
    useRemoveFavoriteCar();

  const handleFavoriteButton = async () => {
    if (!state.auth.admin.uuid) {
      return handleOpenModal();
    }
    try {
      if (isCarFavorite && favoriteCar !== undefined) {
        console.log("ENTRA");
        await removeFavoriteCar(favoriteCar.id);
        setIsCarFavorite(false);
      } else {
        console.log("ENTRA2");
        if (car) {
          console.log(car);
          await addFavoriteCar(car.id, state.auth.admin.id);
          setIsCarFavorite(true);
        } else {
          alert("This car not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addData) {
      setFavoriteCar(addData.insert_user_cars_one);
    }
  }, [addData]);

  useEffect(() => {
    setIsCarFavorite(userCar.length !== 0 && state.auth.admin.id);
    if (state.auth.admin.uuid) {
      setOpenModal(false);
    }
  }, [state, userCar.length, setIsCarFavorite]);

  return (
    <div>
      <styled.AddFavoriteBUtton
        disable={loadingAddFavorite || loadingRemoveFavorite}
        onClick={handleFavoriteButton}
      >
        {isCarFavorite ? "Remove Favorite" : "Add Favorite"}
      </styled.AddFavoriteBUtton>
      {(errorAddFavorite || errorRemoveFavorite) && (
        <styled.ErrorMessage>
          {errorAddFavorite
            ? errorAddFavorite.message
            : errorRemoveFavorite
            ? errorRemoveFavorite.message
            : "Error"}
        </styled.ErrorMessage>
      )}
      <ModalLoginVIew open={openModal} modalClose={handleCloseModal} />
    </div>
  );
};

export default FavoriteButton;
