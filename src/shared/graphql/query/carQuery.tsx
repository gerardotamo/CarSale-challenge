import { gql } from "@apollo/client";

export const ALL_CARS = gql`
    query {
        cars {
        batch
        city {
            name
            id
            state {
            id
            name
            }
        }
        color {
            id
            name
        }
        condition
        damage_type
        description
        id
        odometer
        price
        sale_date
        title
        vin
        year
        model {
            id
            name
            brand {
            id
            name
            }
        }
        }
    }
`