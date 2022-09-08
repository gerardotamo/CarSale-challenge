import { gql } from "@apollo/client";

export const multipleQuery = () => {
  return gql`
    query Multiple_Query {
      brands {
        id
        name
        models {
          name
          id
        }
      }
      states {
        id
        name
      }
      colors {
        id
        name
      }
    }
  `;
};
