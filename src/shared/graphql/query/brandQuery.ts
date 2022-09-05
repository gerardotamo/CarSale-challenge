import { gql } from "@apollo/client";

export const ALL_BRANDS = gql`
    query {
        brands {
            cars_count
            id
            name
            uuid
            models {
                name
                id
            }
        }
    }
`