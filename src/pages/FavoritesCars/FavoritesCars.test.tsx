import '@testing-library/jest-dom';

import {
  FIND_CARS,
  GET_FAVORITE_CAR,
  REMOVE_FAVORITE_CAR,
} from '../../shared/graphql/query/carQuery';
import { Route, Routes } from 'react-router-dom';
import { cleanup, screen } from '@testing-library/react';

import { FavoritesCars } from './FavoritesCars';
import { Login } from '../Login/Login';
import ProtectedRoutes from '../../shared/routes/ProtectedRoutes/ProtectedRoutes';
import { customRender } from '../../shared/utils/test/test-utils';
import userEvent from '@testing-library/user-event';

const ui = (
  <Routes>
    <Route element={<ProtectedRoutes />}>
      <Route element={<FavoritesCars />} path="cars/favorites" />
    </Route>
    <Route element={<Login />} path="login" />
  </Routes>
);

const badRouter = '/cars/favorites';

const mocksAllCars = {
  request: {
    query: FIND_CARS,
    variables: {
      where: {
        _or: [
          {
            model: {
              name: {
                _iregex: '',
              },
            },
          },
          {
            model: {
              brand: {
                name: {
                  _iregex: '',
                },
              },
            },
          },
          {
            vin: {
              _iregex: '',
            },
          },
        ],
      },
      orderBy: [
        {
          year: null,
          sale_date: null,
        },
      ],
    },
  },
  result: {
    data: {
      cars: [
        {
          batch: '521161a4-0022-452c-92c6-76fcfde50e4f',
          city: {
            id: 6,
            name: 'San Diego',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 3,
            name: 'Black',
          },
          condition: 'N',
          damage_type: 'No damage',
          description: 'No damage',
          id: 236,
          odometer: 45000,
          price: '$10,600.00',
          sale_date: '2022-09-23',
          title: 'Rav 4 2017',
          vin: 'MTE4584',
          year: 2017,
          model: {
            id: 6,
            name: 'Rav4',
            brand: {
              id: 2,
              name: 'Toyota',
            },
          },
        },
        {
          batch: 'b58c2373-a2b2-49cb-9578-b0dd18593372',
          city: {
            id: 9,
            name: 'Orlando',
            state: {
              id: 3,
              name: 'FLORIDA',
            },
          },
          color: {
            id: 5,
            name: 'Gray',
          },
          condition: 'A',
          damage_type: null,
          description: null,
          id: 238,
          odometer: 10000,
          price: '$9,750.00',
          sale_date: '2022-10-25',
          title: 'Ford Mustang 2021',
          vin: '123512341234',
          year: 2021,
          model: {
            id: 25,
            name: 'Mustang',
            brand: {
              id: 4,
              name: 'Ford',
            },
          },
        },
        {
          batch: '3bd90848-9654-4be7-9ed9-0e57787b8222',
          city: {
            id: 5,
            name: 'Los Angeles',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 1,
            name: 'Red',
          },
          condition: 'A',
          damage_type: null,
          description: null,
          id: 248,
          odometer: 8000,
          price: '$15,000.00',
          sale_date: '2022-09-24',
          title: 'BMW M4 2022',
          vin: '1M8GDM9A_KP042711',
          year: 2022,
          model: {
            id: 24,
            name: 'M4',
            brand: {
              id: 6,
              name: 'BMW',
            },
          },
        },
        {
          batch: '064a8178-1b2d-44e5-b5c6-1732d04566f6',
          city: {
            id: 5,
            name: 'Los Angeles',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 2,
            name: 'White',
          },
          condition: 'N',
          damage_type: null,
          description: null,
          id: 256,
          odometer: 27500,
          price: '$26,000.00',
          sale_date: '2022-09-30',
          title: 'Subaru Forester 2020',
          vin: '8YT3HNUAP73',
          year: 2020,
          model: {
            id: 14,
            name: 'Forester',
            brand: {
              id: 7,
              name: 'Subaru',
            },
          },
        },
        {
          batch: '8690bf8a-7817-47c8-a6a1-a208c20e0f74',
          city: {
            id: 9,
            name: 'Orlando',
            state: {
              id: 3,
              name: 'FLORIDA',
            },
          },
          color: {
            id: 3,
            name: 'Black',
          },
          condition: 'A',
          damage_type: null,
          description: null,
          id: 223,
          odometer: 98500,
          price: '$7,000.00',
          sale_date: '2022-09-19',
          title: 'Subaru Impreza 2009',
          vin: '3847H0GF987HERG3',
          year: 2009,
          model: {
            id: 13,
            name: 'Impreza',
            brand: {
              id: 7,
              name: 'Subaru',
            },
          },
        },
        {
          batch: '1e3eae20-68d5-4cf3-aa7e-9899db4f4f42',
          city: {
            id: 6,
            name: 'San Diego',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 2,
            name: 'White',
          },
          condition: 'A',
          damage_type: 'Front damage',
          description: 'Front Damage',
          id: 237,
          odometer: 25000,
          price: '$10,000.00',
          sale_date: '2022-09-21',
          title: 'Nissan Rogue 2016',
          vin: 'ROG4546',
          year: 2016,
          model: {
            id: 8,
            name: 'Rogue',
            brand: {
              id: 3,
              name: 'Nissan',
            },
          },
        },
        {
          batch: 'c4c8a177-19ef-488c-97c4-8705c0f20773',
          city: {
            id: 9,
            name: 'Orlando',
            state: {
              id: 3,
              name: 'FLORIDA',
            },
          },
          color: {
            id: 7,
            name: 'Yellow',
          },
          condition: 'A',
          damage_type: null,
          description: null,
          id: 239,
          odometer: 250000,
          price: '$31,416.00',
          sale_date: '2022-12-14',
          title: 'Dodge Charger 2023',
          vin: '7UTN5LPP8NTS0',
          year: 2023,
          model: {
            id: 28,
            name: 'Charger',
            brand: {
              id: 8,
              name: 'Dodge',
            },
          },
        },
        {
          batch: '30df7835-8534-4af0-85d0-168a7514183e',
          city: {
            id: 5,
            name: 'Los Angeles',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 2,
            name: 'White',
          },
          condition: 'A',
          damage_type: null,
          description: null,
          id: 247,
          odometer: 9000,
          price: '$7,000.00',
          sale_date: '2022-09-24',
          title: 'Ford Ranger 2010',
          vin: '1M8GDM9A_KP042710',
          year: 2010,
          model: {
            id: 26,
            name: 'Ranger',
            brand: {
              id: 4,
              name: 'Ford',
            },
          },
        },
        {
          batch: '46f304bc-69d9-40a8-b1fe-90ddf2b73fb9',
          city: {
            id: 6,
            name: 'San Diego',
            state: {
              id: 2,
              name: 'CALIFORNIA',
            },
          },
          color: {
            id: 3,
            name: 'Black',
          },
          condition: 'N',
          damage_type: null,
          description: null,
          id: 249,
          odometer: 21500,
          price: '$54,654.00',
          sale_date: '2022-09-29',
          title: 'Nissan Versa 2020',
          vin: '4K65J9HG9KF4H',
          year: 2020,
          model: {
            id: 7,
            name: 'Versa',
            brand: {
              id: 3,
              name: 'Nissan',
            },
          },
        },
        {
          batch: 'd45af514-1d61-43fd-af51-fa01ee09b191',
          city: {
            id: 8,
            name: 'Miami',
            state: {
              id: 3,
              name: 'FLORIDA',
            },
          },
          color: {
            id: 3,
            name: 'Black',
          },
          condition: 'N',
          damage_type: 'No damage',
          description: 'No damage',
          id: 253,
          odometer: 45000,
          price: '$125,000.00',
          sale_date: '2022-10-01',
          title: 'Nissan versa 2017',
          vin: 'NV457500',
          year: 2017,
          model: {
            id: 7,
            name: 'Versa',
            brand: {
              id: 3,
              name: 'Nissan',
            },
          },
        },
      ],
    },
  },
};

const mocksFavoritesCars = {
  request: {
    query: GET_FAVORITE_CAR,
    variables: {
      where: {
        user_id: {
          _eq: 1,
        },
      },
    },
  },
  result: {
    data: {
      user_cars: [
        {
          id: 1,
          user_id: 1,
          car_id: 236,
        },
        {
          id: 2,
          user_id: 1,
          car_id: 238,
        },
      ],
    },
  },
};

const mocksFavoritesCarsIsEmpty = {
  request: {
    query: GET_FAVORITE_CAR,
    variables: {
      where: {
        user_id: {
          _eq: 1,
        },
      },
    },
  },
  result: {
    data: {
      user_cars: [],
    },
  },
};

const muckRemoveFavoriteCar = {
  request: {
    query: REMOVE_FAVORITE_CAR,
    variables: {
      deleteUserCarsByPkId: 236,
    },
  },
  result: {
    data: {
      delete_user_cars_by_pk: {
        id: 236,
      },
    },
  },
};

const stateProvider = {
  auth: {
    admin: {
      email: 'gerardotamo@ravn.co',
      first_name: 'Gerardo',
      id: 1,
      last_name: 'Tamo',
      uuid: 'f234050c-be3c-4f93-afe0-c763bd6fb492',
      __typename: 'users',
    },
  },
};

beforeEach(async () => {
  customRender(<FavoritesCars />, {
    mockApollo: [mocksAllCars, mocksFavoritesCars],
  });
});

afterEach(cleanup);

test('Favorite shoulb be visible', () => {
  const imageText: HTMLHeadElement = screen.getByText(/image/i);
  expect(imageText).toBeInTheDocument();
});

test('Skeleton should be visible', () => {
  const skeleton = screen.getAllByTestId('skeleton-car');
  expect(skeleton).toHaveLength(3);
});

test('Favorite list should be have two cars visible', async () => {
  cleanup();
  customRender(ui, {
    mockApollo: [mocksAllCars, mocksFavoritesCars],
    stateProvider: {
      ...stateProvider,
    },
    badRouter,
  });
  const nameCar = await screen.findAllByText(/city/i);
  expect(nameCar).toHaveLength(2);
});

test('Favorite should be show not found items when is empty', async () => {
  cleanup();
  customRender(ui, {
    mockApollo: [mocksAllCars, mocksFavoritesCarsIsEmpty],
    stateProvider: {
      ...stateProvider,
    },
    badRouter,
  });
  const notFoundItems = await screen.findByText(/Not Found Items/i);
  expect(notFoundItems).toBeInTheDocument();
});

test('Favorite page not should be visible when user is not login', async () => {
  cleanup();
  customRender(ui, {
    mockApollo: [mocksAllCars, mocksFavoritesCars],
    badRouter,
    stateProvider: {
      auth: {
        admin: { uuid: undefined },
      },
    },
  });

  const loginInput = await screen.findByPlaceholderText(/email/i);
  expect(loginInput).toBeInTheDocument();
});

test('The button favorite should be remove one car favorites', async () => {
  cleanup();
  customRender(<FavoritesCars />, {
    mockApollo: [mocksAllCars, mocksFavoritesCars, muckRemoveFavoriteCar],
    badRouter,
    stateProvider: {
      ...stateProvider,
    },
  });

  const buttonsFavorites = await screen.findAllByRole('button');
  userEvent.click(buttonsFavorites[0]);

  const resultButtonsFavorites = await screen.findAllByRole('button');
  expect(resultButtonsFavorites).toHaveLength(1);
});
