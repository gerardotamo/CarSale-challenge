import { gql } from "@apollo/client";

export const ALL_CARS = gql`
  query Car {
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
`;

export const FIND_CARS = gql`
  query Find_Car($where: cars_bool_exp, $orderBy: [cars_order_by!]) {
    cars(where: $where, order_by: $orderBy) {
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
`;

export const ADD_CAR = gql`
  mutation Add_Car($object: cars_insert_input!) {
    insert_cars_one(object: $object) {
      city_id
      brand_id
      color_id
      condition
      model_id
      odometer
      price
      sale_date
      state_id
      vin
      year
      title
    }
  }
`;
