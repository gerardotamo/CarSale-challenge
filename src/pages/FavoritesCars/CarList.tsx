import { Cars, User_Cars } from '../../shared/graphql/__generate__/generated';

import { CardItem } from '../../components/CardItem/CardItem';
import { NotFoundItem } from '../../components/NotFoundItem/NotFoundItem';

interface PropsCarList {
  favoriteCar:
    | {
        user_cars: User_Cars[];
      }
    | undefined;
  data:
    | {
        cars: Cars[];
      }
    | undefined;
}

const CarList = ({ favoriteCar, data }: PropsCarList) => {
  return (
    <>
      {favoriteCar && favoriteCar.user_cars.length === 0 ? (
        <NotFoundItem />
      ) : (
        favoriteCar &&
        data?.cars.map((item: Cars, index: number) => {
          return (
            <CardItem
              data={item}
              key={index}
              favorite_cars={favoriteCar.user_cars}
              showFavorites={true}
            />
          );
        })
      )}
    </>
  );
};

export default CarList;
