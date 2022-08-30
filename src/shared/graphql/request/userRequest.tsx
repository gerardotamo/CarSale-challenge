import * as usersQuery from '../../../shared/graphql/query/userQuery';
import { useLazyQuery } from '@apollo/client'

export const useFindUser = (email: string) => {
    const [getUser, result] = useLazyQuery(usersQuery.FIND_USER);

    const findUser = () => {
        getUser({
            variables: {
                "where": {
                    "email": {
                        "_eq": email
                    }
                }
            }
        })
    }

    return {
        findUser,
        result
    }
}
