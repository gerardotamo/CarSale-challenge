import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { FIND_USER } from '../../shared/graphql/query/userQuery';
import { GraphQLError } from 'graphql';
import LoginComponent from './Login';
import { MockedProvider } from '@apollo/client/testing';
import { StoreProvider } from '../../shared/contexts/StoreProvider';
import userEvent from '@testing-library/user-event';

const mocks = [
  {
    request: {
      query: FIND_USER,
      variables: {
        where: {
          email: {
            _eq: 'test@test.co',
          },
        },
      },
    },
    error: new Error('Email not register'),
    result: {
      data: {
        users: [
          {
            id: '1',
            first_name: 'test',
            uuid: 'asdasd',
            last_name: 'test',
            email: 'test@test.co',
          },
        ],
      },
      errors: [new GraphQLError('Email not register')],
    },
  },
];

beforeEach(async () => {
  render(
    <StoreProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginComponent />
      </MockedProvider>
    </StoreProvider>
  );
});

test('email input should be rendered', () => {
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  expect(emailInputElement).toBeInTheDocument();
});

test('email input should be empty', () => {
  const emailInputElement: HTMLInputElement =
    screen.getByPlaceholderText(/email/i);
  expect(emailInputElement.value).toBe('');
});

test('email input should be change text', () => {
  const emailInputElement: HTMLInputElement =
    screen.getByPlaceholderText(/email/i);
  const testValue = 'testvalue';
  fireEvent.change(emailInputElement, { target: { value: testValue } });
  expect(emailInputElement.value).toBe(testValue);
});

test('button should be enable', () => {
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeEnabled();
});

test('error message should be disabled', () => {
  const errorElement: HTMLParagraphElement = screen.getByTestId('error');
  expect(errorElement.textContent).toBe('');
});

test('button should be disabled when click', () => {
  const button = screen.getByRole('button');
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  const testValue = 'test@test.com';
  fireEvent.change(emailInputElement, { target: { value: testValue } });
  fireEvent.click(button);
  expect(button).toBeDisabled();
});

test('error should be visible when the email is not valid', async () => {
  const button = screen.getByRole('button');
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  const testValue = 'test@tes';
  fireEvent.change(emailInputElement, { target: { value: testValue } });
  userEvent.click(button);

  expect(await screen.findByText('Email not valid')).toBeInTheDocument();
});

it('error should be visible when the email is not register', async () => {
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  const button = await screen.findByText('Login');
  const testValue = 'test@test.co';
  userEvent.type(emailInputElement, testValue);
  userEvent.click(button);

  await waitFor(async () =>
    expect(await screen.findByRole('button')).not.toHaveTextContent(
      'Loading...'
    )
  );
  expect((await screen.findByTestId('error')).textContent).toBe(
    'Email not register'
  );
});
