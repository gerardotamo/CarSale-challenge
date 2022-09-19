import { Cities } from '../__generate__/generated';
import { FIND_CITIES } from '../query/cityQuery';
import { useLazyQuery } from '@apollo/client';
type City = Pick<Cities, 'id' | 'name'>;
export const useFindCity = () => {
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
