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
  query Find_Car(
    $where: cars_bool_exp
    $orderBy: [cars_order_by!]
    $userCarsWhere: user_cars_bool_exp
  ) {
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
    user_cars(where: $userCarsWhere) {
      user_id
      id
      car_id
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

export const FIND_USER_CARS = gql`
  query FIND_USER_CARS($where: user_cars_bool_exp) {
    user_cars(where: $where) {
      user_id
      id
      car_id
    }
  }
`;

//export const FIND_FAVORITE = gql``;
