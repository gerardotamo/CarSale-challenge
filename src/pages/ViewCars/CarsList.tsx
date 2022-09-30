import { Cars, User_Cars } from '../../shared/graphql/__generate__/generated';

import { CardItem } from '../../components/CardItem/CardItem';
import { NotFoundItem } from '../../components/NotFoundItem/NotFoundItem';

interface CarsListProps {
  favoriteCar:
    | {
        user_cars: User_Cars[];
      }
    | undefined;
  cars: Cars[] | undefined;
  loadingFavoriteCar: boolean;
}
const CarsList = ({ favoriteCar, cars, loadingFavoriteCar }: CarsListProps) => {
  return (
    <>
      {cars?.length === 0 ? (
        <NotFoundItem />
      ) : (
        cars?.map((item: Cars, index: number) => {
          return (
            <CardItem
              data={item}
              key={index}
              favorite_cars={favoriteCar ? favoriteCar.user_cars : []}
              loadingFavoriteCar={loadingFavoriteCar}
            />
          );
        })
      )}
    </>
  );
};
export default CarsList;
