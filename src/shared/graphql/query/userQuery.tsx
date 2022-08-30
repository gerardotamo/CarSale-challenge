import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query {
    users {
        email
        first_name
        id
        last_name
        uuid
    }
  }
`


export const FIND_USER = gql`
    query ($where: users_bool_exp) {
        users(where: $where){
            id
            email
            first_name
            last_name
        }
     }
`