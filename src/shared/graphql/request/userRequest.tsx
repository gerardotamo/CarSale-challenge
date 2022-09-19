import * as usersQuery from '../../../shared/graphql/query/userQuery';

import { useLazyQuery } from '@apollo/client';

export const useFindUser = () => {
  const [getUser, result] = useLazyQuery(usersQuery.FIND_USER);

  const findUser = async (email: string) => {
    await getUser({
      variables: {
        where: {
          email: {
            _eq: email,
          },
        },
      },
    });
  };

  return {
    findUser,
    errorRequest: result.error,
    data: result.data,
    loading: result.loading,
  };
};
