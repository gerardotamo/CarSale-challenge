import { gql } from "@apollo/client";

export const ALL_BRANDS = gql`
    query {
        brands {
            id
            name
            models {
                name
                id
            }
        }
    }
`