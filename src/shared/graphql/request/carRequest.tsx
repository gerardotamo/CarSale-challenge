import {
  ADD_CAR,
  ADD_FAVORITE_CAR,
  FIND_CARS,
  GET_CAR,
  GET_FAVORITE_CAR,
  REMOVE_FAVORITE_CAR,
} from '../query/carQuery';
import { Cars, User_Cars } from '../__generate__/generated';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { IFormInput } from '../../../pages/ViewCreateCar/ViewCreateCar';

export const useGetCar = (carId: number, userId: number | undefined) => {
  const variables = {
    where: {
      id: {
        _eq: carId,
      },
    },
    userCarsWhere: {
      _and: [
        {
          car_id: {
            _eq: carId,
          },
          user_id: {
            _eq: userId,
          },
        },
      ],
    },
  };
  return useQuery<{ cars: Cars[]; user_cars: User_Cars[] }>(GET_CAR, {
    variables: {
      ...variables,
    },
    fetchPolicy: 'network-only',
  });
};

export const useFindCar = () => {
  const [getCars, result] = useLazyQuery(FIND_CARS);

  const findCars = async (
    search: string | null,
    orderByYear: string | null,
    orderBySaleDate: string | null
  ) => {
    const searchFilter = search === null ? '' : search;
    const filter = {
      orderBy: [
        {
          year: orderByYear,
          sale_date: orderBySaleDate,
        },
      ],
    };

    let where: object = {
      _or: [
        {
          model: {
            name: {
              _iregex: searchFilter,
            },
          },
        },
        {
          model: {
            brand: {
              name: {
                _iregex: searchFilter,
              },
            },
          },
        },
        {
          vin: {
            _iregex: searchFilter,
          },
        },
      ],
    };

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        searchFilter
      )
    ) {
      where = {
        batch: {
          _eq: searchFilter,
        },
      };
    }

    await getCars({
      variables: {
        where: {
          ...where,
        },

        ...filter,
      },
    });
  };

  return {
    findCars,
    errorRequest: result.error,
    data: result.data,
    loading: result.loading,
  };
};

export const useAddCar = () => {
  const [addCar, { data, loading, error }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: FIND_CARS }],
  });
  const addCarOne = async (value: IFormInput) => {
    await addCar({
      variables: {
        object: {
          brand_id: value.brand_id,
          model_id: value.model_id,
          state_id: value.state_id,
          city_id: value.city_id,
          color_id: value.color_id,
          vin: value.vin,
          year: value.year,
          sale_date: value.sale_date,
          odometer: value.odometer,
          price: value.price,
          condition: value.condition,
          title: value.title,
        },
      },
    });
  };
  return {
    addCarOne,
    errorRequest: error,
    dataAdd: data,
    loadingADdCar: loading,
  };
};

export const useGetCarFavorite = () => {
  const [getFavoritesCars, result] = useLazyQuery<{ user_cars: User_Cars[] }>(
    GET_FAVORITE_CAR,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  const findFavoritesCars = async (user_id: number | undefined) => {
    const userCarsWhere = user_id
      ? {
          user_id: {
            _eq: user_id,
          },
        }
      : {
          user_id: {
            _is_null: true,
          },
        };

    await getFavoritesCars({
      variables: {
        where: {
          ...userCarsWhere,
        },
      },
      fetchPolicy: 'network-only',
    });
  };
  return {
    findFavoritesCars,
    errorFavoriteCars: result.error,
    data: result.data,
    loading: result.loading,
  };
};

export const useAddFavoriteCar = () => {
  const [addFavCar, { data, loading, error }] = useMutation(ADD_FAVORITE_CAR);
  const addFavoriteCar = async (car_id: number, user_id: number) => {
    const todo = {
      car_id,
      user_id,
    };
    const where = {
      where: {
        user_id: {
          _eq: user_id,
        },
      },
    };

    await addFavCar({
      variables: {
        object: {
          ...todo,
        },
      },
      optimisticResponse: {
        insert_user_cars_one: {
          __typename: 'user_cars',
          ...todo,
          id: Math.random() * 100,
        },
      },
      update: (proxy, response) => {
        const previousData = proxy.readQuery<{ user_cars: User_Cars[] }>({
          query: GET_FAVORITE_CAR,
          variables: {
            ...where,
          },
        });
        const previous =
          previousData !== null ? [...previousData.user_cars] : [];
        proxy.writeQuery({
          query: GET_FAVORITE_CAR,
          variables: {
            ...where,
          },
          data: {
            ...previousData,
            user_cars: [response.data.insert_user_cars_one, ...previous],
          },
        });
      },
      refetchQueries: [
        {
          query: GET_FAVORITE_CAR,
          ...where,
        },
      ],
      awaitRefetchQueries: true,
    });
  };
  return {
    addFavoriteCar,
    addData: data,
    errorAddFavorite: error,
    loadingAddFavorite: loading,
  };
};

export const useRemoveFavoriteCar = () => {
  const [removeFavCar, { data, loading, error }] =
    useMutation(REMOVE_FAVORITE_CAR);
  const removeFavoriteCar = async (id: number, user_id: number) => {
    const variables = {
      variables: {
        where: {
          user_id: {
            _eq: user_id,
          },
        },
      },
    };
    await removeFavCar({
      variables: {
        deleteUserCarsByPkId: id,
      },
      optimisticResponse: {
        delete_user_cars_by_pk: {
          id: Math.random() * 100,
        },
      },
      update: (proxy, response, cache) => {
        const previousData = proxy.readQuery<{ user_cars: User_Cars[] }>({
          query: GET_FAVORITE_CAR,
          ...variables,
        });
        console.log(previousData);
        proxy.writeQuery({
          query: GET_FAVORITE_CAR,
          ...variables,
          data: {
            user_cars: previousData?.user_cars.filter(car => car.id !== id),
          },
        });
      },
    });
  };
  return {
    removeFavoriteCar,
    data,
    errorRemoveFavorite: error,
    loadingRemoveFavorite: loading,
  };
};
