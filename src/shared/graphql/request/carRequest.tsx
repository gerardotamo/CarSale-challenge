import { useLazyQuery } from "@apollo/client";
import { FIND_CARS } from "../query/carQuery";

export const useFindCar = () => {
  const [getCars, result] = useLazyQuery(FIND_CARS);

  const findCars = async (
    search: string,
    orderByYear: string | null,
    orderBySaleDate: string | null
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
