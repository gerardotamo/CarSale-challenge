import * as styled from './styled';

import { Cars, User_Cars } from '../../shared/graphql/__generate__/generated';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  useAddFavoriteCar,
  useRemoveFavoriteCar,
} from '../../shared/graphql/request/carRequest';
import { useEffect, useState } from 'react';

import { BaseColor } from '../../config/color';
import ModalLoginVIew from '../../components/Modal/Modal';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';

interface PropsFavoriteButton {
  userCar: User_Cars[];
  carData: Cars;
  loading?: boolean;
  removeCar?: () => void;
}

const FavoriteButton = ({
  userCar,
  carData,
  loading = false,
  removeCar = () => {},
}: PropsFavoriteButton) => {
  const car = carData;
  const { state } = useGeneralContext();
  const [favoriteCar, setFavoriteCar] = useState(
    userCar.find(item => item.car_id === carData.id)
  );
  const [isFavoriteCar, setIsFavoriteCar] = useState<boolean>(
    favoriteCar !== undefined && state.auth.admin.uuid
  );

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { addFavoriteCar, errorAddFavorite, addData } = useAddFavoriteCar();
  const { removeFavoriteCar, errorRemoveFavorite } = useRemoveFavoriteCar(
    favoriteCar?.id,
    state.auth.admin.id
  );

  const handleFavoriteButton = async () => {
    if (!state.auth.admin.uuid) {
      return handleOpenModal();
    }
    try {
      if (isFavoriteCar && favoriteCar !== undefined) {
        removeFavoriteCar(favoriteCar.id, state.auth.admin.id);
        removeCar();
        setIsFavoriteCar(false);
      } else {
        if (car) {
          addFavoriteCar(car.id, state.auth.admin.id);
          setIsFavoriteCar(true);
        } else {
          alert('This car not found');
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
    if (state.auth.admin.uuid) {
      setOpenModal(false);
      const fav = userCar.find(item => item.car_id === carData.id);
      setFavoriteCar(fav);
      setIsFavoriteCar(fav !== undefined);
    } else {
      setIsFavoriteCar(false);
    }
  }, [userCar, state]);

  return (
    <div>
      {!loading ? (
        <>
          <styled.AddFavoriteBUtton
            disable={false}
            onClick={handleFavoriteButton}
          >
            {isFavoriteCar ? 'Remove Favorite' : 'Add Favorite'}
          </styled.AddFavoriteBUtton>
          {(errorAddFavorite ?? errorRemoveFavorite) && (
            <styled.ErrorMessage>
              {errorAddFavorite
                ? errorAddFavorite.message
                : errorRemoveFavorite
                ? errorRemoveFavorite.message
                : 'Error'}
            </styled.ErrorMessage>
          )}
          <ModalLoginVIew open={openModal} modalClose={handleCloseModal} />
        </>
      ) : (
        <SkeletonTheme
          baseColor={BaseColor.blueDarkColor}
          highlightColor={BaseColor.lightBluePrimaryColor}
        >
          <Skeleton width={140} height={20} />
        </SkeletonTheme>
      )}
    </div>
  );
};

export default FavoriteButton;
