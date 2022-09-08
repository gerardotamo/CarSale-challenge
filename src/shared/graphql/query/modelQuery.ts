import { gql } from "@apollo/client";

export const FIND_MODEL = gql`
  query Find_Model($where: models_bool_exp) {
    models(where: $where) {
      name
      id
    }
  }
`;
