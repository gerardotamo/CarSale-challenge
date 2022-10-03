import '@testing-library/jest-dom';

import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import { ADD_CAR } from '../../shared/graphql/query/carQuery';
import { DateToday } from '../../shared/utils/date';
import { FIND_CITIES } from '../../shared/graphql/query/cityQuery';
import { FIND_MODEL } from '../../shared/graphql/query/modelQuery';
import ViewCreateCar from './ViewCreateCar';
import { customRender } from '../../shared/utils/test/test-utils';
import { multipleQuery } from '../../shared/graphql/query/nesterQuery';
import { select } from 'react-select-event';
import userEvent from '@testing-library/user-event';

const mockGetAllBrands = {
  request: {
    query: multipleQuery(),
  },
  result: {
    data: {
      brands: [
        {
          id: 1,
          name: 'Jeep',
        },
      ],
      states: [
        {
          id: 1,
          name: 'UTAH',
        },
      ],
      colors: [
        {
          id: 1,
          name: 'red',
        },
      ],
    },
  },
};

const mockGetModelWithBrand = {
  request: {
    query: FIND_MODEL,
    variables: {
      where: {
        brand_id: {
          _eq: 1,
        },
      },
    },
  },
  result: {
    data: {
      models: [{ name: 'Patriot', id: 1 }],
    },
  },
};

const mockGetCityWithState = {
  request: {
    query: FIND_CITIES,
    variables: {
      where: {
        state_id: {
          _eq: 1,
        },
      },
    },
  },
  result: {
    data: {
      cities: [{ name: 'Provo', id: 1 }],
    },
  },
};

const mockCreateNewCar = {
  request: {
    query: ADD_CAR,
    variables: {
      object: {
        brand_id: 1,
        model_id: 1,
        state_id: 1,
        city_id: 1,
        color_id: 1,
        vin: 'AAAAAA',
        year: '1940',
        sale_date: DateToday(),
        odometer: '10000',
        price: '1500',
        condition: 'A',
        title: 'Jeep Patriot 1940',
      },
    },
  },
  result: {
    data: {
      insert_cars_one: [
        {
          city_id: 1,
          brand_id: 1,
          color_id: 1,
          condition: 'A',
          model_id: 1,
          odometer: '10000',
          price: '1500',
          sale_date: DateToday(),
          state_id: 1,
          vin: 'AAAAA',
          year: 1940,
          title: '',
        },
      ],
    },
  },
};

beforeEach(() =>
  customRender(<ViewCreateCar />, { mockApollo: [mockGetAllBrands] })
);

afterEach(cleanup);

test('should be render loading create car view', async () => {
  const loading = await screen.findByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});

test('should be render create car view', async () => {
  const createCarHeader = await screen.findByText(/Create Car/i);
  expect(createCarHeader).toBeInTheDocument();
});

test('should be render change value into select brand', async () => {
  cleanup();
  const { findByTestId, getByLabelText, getByText } = customRender(
    <ViewCreateCar />,
    {
      mockApollo: [mockGetAllBrands],
    }
  );
  expect(await findByTestId('form')).toBeInTheDocument();
  await select(getByLabelText(/Select Brand/i), 'Jeep');
  expect(getByText(/Jeep/i)).toBeInTheDocument();
});

test('should be change value into select model when select one brand', async () => {
  cleanup();
  const { findByTestId, getByText, findByText, findAllByTestId, container } =
    customRender(<ViewCreateCar />, {
      mockApollo: [mockGetAllBrands, mockGetModelWithBrand],
    });
  expect(await findByTestId('form')).toBeInTheDocument();
  const select = await findAllByTestId('select');
  fireEvent.keyDown(select[0].firstChild ?? container, { key: 'ArrowDown' });
  await waitFor(() => getByText('Jeep'));
  fireEvent.click(getByText('Jeep'));
  expect(await findByText('Jeep')).toBeInTheDocument();
  fireEvent.keyDown(select[1].firstChild ?? container, { key: 'ArrowDown' });
  await waitFor(() => getByText('Patriot'));
  fireEvent.click(getByText('Patriot'));
  expect(await findByText('Patriot')).toBeInTheDocument();
});

test('should be change value into select model when select one brand', async () => {
  cleanup();
  const { findByTestId, getByText, findByText, findAllByTestId, container } =
    customRender(<ViewCreateCar />, {
      mockApollo: [mockGetAllBrands, mockGetCityWithState],
    });
  expect(await findByTestId('form')).toBeInTheDocument();
  const select = await findAllByTestId('select');
  fireEvent.keyDown(select[2].firstChild ?? container, { key: 'ArrowDown' });
  expect(getByText('UTAH')).toBeInTheDocument();
  fireEvent.click(getByText('UTAH'));
  expect(await findByText('UTAH')).toBeInTheDocument();
  fireEvent.keyDown(select[3].firstChild ?? container, { key: 'ArrowDown' });
  await waitFor(() => getByText('Provo'));
  fireEvent.click(getByText('Provo'));
  expect(await findByText('Provo')).toBeInTheDocument();
});

test('should be show errors in inputs required', async () => {
  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  expect(await screen.findByText('Brand is required')).toBeInTheDocument();
});

test('should be value of date input equal today', async () => {
  const saleDate = await screen.findByTestId('date-picker');
  const inputDate = saleDate.getElementsByTagName('input')[0];
  const testValue = DateToday();
  expect(inputDate.value).toBe(testValue);
});

test('should be send create car', async () => {
  cleanup();
  const { container, findByTestId, findAllByTestId, getByText, findByText } =
    customRender(<ViewCreateCar />, {
      mockApollo: [
        mockGetAllBrands,
        mockGetCityWithState,
        mockGetModelWithBrand,
        mockCreateNewCar,
      ],
    });
  expect(await findByTestId('form')).toBeInTheDocument();
  const select = await findAllByTestId('select');

  fireEvent.keyDown(select[0].firstChild ?? container, {
    key: 'ArrowDown',
  });
  fireEvent.click(getByText('Jeep'));
  expect(await findByText('Jeep')).toBeInTheDocument();
  fireEvent.keyDown(select[1].firstChild ?? container, { key: 'ArrowDown' });
  await waitFor(() => getByText('Patriot'));
  fireEvent.click(getByText('Patriot'));
  expect(await findByText('Patriot')).toBeInTheDocument();

  fireEvent.keyDown(select[2].firstChild ?? container, { key: 'ArrowDown' });
  expect(getByText('UTAH')).toBeInTheDocument();
  fireEvent.click(getByText('UTAH'));
  fireEvent.keyDown(select[3].firstChild ?? container, { key: 'ArrowDown' });
  await waitFor(() => getByText('Provo'));
  fireEvent.click(getByText('Provo'));
  expect(await findByText('Provo')).toBeInTheDocument();

  fireEvent.keyDown(select[4].firstChild ?? container, { key: 'ArrowDown' });
  expect(getByText('red')).toBeInTheDocument();
  fireEvent.click(getByText('red'));
  expect(await findByText('red')).toBeInTheDocument();

  const vinInput = await findByTestId('vin');
  const yearInput = await findByTestId('year');

  userEvent.type(vinInput, 'AAAAAA');
  userEvent.type(yearInput, '1940');

  const buttonSend = await screen.findByRole('button');
  userEvent.click(buttonSend);

  expect(await screen.findByText('The car is Adding')).toBeInTheDocument();
});
