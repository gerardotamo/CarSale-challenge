import React, { FC, useReducer } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { appReducer, initialAppState } from '../../contexts/appReducer';

import { GeneralContext } from '../../contexts/StoreProvider';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

interface IExtendedRenderOptions extends RenderOptions {
  badRouter?: string;
  stateProvider?: any;
  mockApollo?: any[];
}

const AllTheProvider: FC<{
  children: React.ReactNode;
  mocks?: any[];
  badRoute?: string;
  stateProvider?: any;
}> = ({
  children,
  mocks = [],
  badRoute = '',
  stateProvider = initialAppState,
}) => {
  const [state, dispatch] = useReducer(appReducer, stateProvider);
  return (
    <GeneralContext.Provider value={{ state, dispatch }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[badRoute]}>{children}</MemoryRouter>
      </MockedProvider>
    </GeneralContext.Provider>
  );
};

const setupComponent = (
  ui: React.ReactNode,
  renderOptions?: IExtendedRenderOptions
) => {
  if (!renderOptions) {
    return <AllTheProvider>{ui}</AllTheProvider>;
  }
  return (
    <AllTheProvider
      badRoute={renderOptions.badRouter}
      mocks={renderOptions.mockApollo}
      stateProvider={renderOptions.stateProvider}
    >
      {ui}
    </AllTheProvider>
  );
};

const customRender = (
  ui: React.ReactNode,
  renderOptions?: IExtendedRenderOptions
) => {
  try {
    const componentTree = setupComponent(ui, renderOptions);
    return render(componentTree);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export * from '@testing-library/react';
export { customRender };
export type { IExtendedRenderOptions };
