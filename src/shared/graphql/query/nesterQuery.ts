import { gql } from "@apollo/client";
import { ALL_BRANDS } from "./brandQuery";
import { ALL_CITIES } from "./cityQuery";

export const multipleQuery = () => {
    return gql`
        query Multiple_Query{
            brands {
                id
                name
                models {
                    name
                    id
                }
            }
            cities {
                id
                name
                state {
                    id
                    name
                }
            }      
        }
    `;
} 