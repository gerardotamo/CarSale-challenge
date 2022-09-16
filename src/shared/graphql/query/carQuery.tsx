import { gql } from "@apollo/client";

export const GET_CAR = gql`
  query GET_CAR($where: cars_bool_exp, $userCarsWhere: user_cars_bool_exp) {
    cars(where: $where) {
      id
      batch
      model {
        name
      }
      odometer
      price
      sale_date
      state {
        name
      }
      brand {
        name
      }
      city {
        name
      }
      color {
        name
      }
      condition
      damage_type
      description
      title
      year
      vin
    }
    user_cars(where: $userCarsWhere) {
      id
      car_id
      user_id
    }
  }
`;

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

export const GET_FAVORITE_CAR = gql`
  query GET_FAVORITE_CAR($where: user_cars_bool_exp) {
    user_cars(where: $where) {
      id
      user_id
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

export const ADD_FAVORITE_CAR = gql`
  mutation ADD_FAVORITE_CAR($object: user_cars_insert_input!) {
    insert_user_cars_one(object: $object) {
      car_id
      user_id
      id
    }
  }
`;

export const REMOVE_FAVORITE_CAR = gql`
  mutation REMOVE_FAVORITE_CAR($deleteUserCarsByPkId: Int!) {
    delete_user_cars_by_pk(id: $deleteUserCarsByPkId) {
      id
    }
  }
`;
