import { useLazyQuery } from "@apollo/client";
import { FIND_CITIES } from "../query/cityQuery";
import { Cities } from "../__generate__/generated";
type City = Pick<Cities, "id" | "name">;
export const useFindModel = () => {
  const [getCities, result] = useLazyQuery<{ cities: City[] }>(FIND_CITIES);

  const findCity = async (id: number) => {
    await getCities({
      variables: {
        where: {
          state_id: {
            _eq: id,
          },
        },
      },
    });
  };
  return {
    findCity,
    errorRequest: result.error,
    data: result.data,
    loading: result.loading,
  };
};
