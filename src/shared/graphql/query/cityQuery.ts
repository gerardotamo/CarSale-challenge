import { gql } from '@apollo/client';

export const FIND_CITIES = gql`
  query Find_Cities($where: cities_bool_exp) {
    cities(where: $where) {
      name
      id
    }
  }
`;
