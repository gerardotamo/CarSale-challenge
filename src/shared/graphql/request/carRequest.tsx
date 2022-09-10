import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { IFormInput } from "../../../pages/ViewCreateCar/ViewCreateCar";
import { ADD_CAR, FIND_CARS, FIND_USER_CARS } from "../query/carQuery";
import { User_Cars } from "../__generate__/generated";

export const useFindCar = () => {
  const [getCars, result] = useLazyQuery(FIND_CARS);

  const findCars = async (
    search: string,
    orderByYear: string | null,
    orderBySaleDate: string | null,
    user_id: number | undefined
  ) => {
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
              _iregex: search,
            },
          },
        },
        {
          model: {
            brand: {
              name: {
                _iregex: search,
              },
            },
          },
        },
        {
          vin: {
            _iregex: search,
          },
        },
      ],
    };

    const userCarsWhere = user_id
      ? {
          user_id: {
            _eq: user_id,
          },
        }
      : {};

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        search
      )
    ) {
      where = {
        batch: {
          _eq: search,
        },
      };
    }

    await getCars({
      variables: {
        where: {
          ...where,
        },
        userCarsWhere: {
          ...userCarsWhere,
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
  const [addCar, { data, loading, error }] = useMutation(ADD_CAR);
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

/*export const useFindUserCar = (user_id: number) => {
  const variablesFindUserCar = {
    variables: {
      where: {
        user_id: {
          _eq: user_id,
        },
      },
    },
  };
  const { data } = useQuery<User_Cars[]>(FIND_USER_CARS, variablesFindUserCar);
  const _or = data?.map((item) => {
    return {
      id: {
        _eq: item.car_id,
      },
    };
  });

  const {findCars} = useFindCar();

  const 
};*/
