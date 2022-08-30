import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './shared/contexts/StoreProvider';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

export const link = new HttpLink({
  uri: 'https://new-anchovy-87.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'rTisquXVdS2Ffxe5nK92OnNQjK72OpuKTPWUpM4kbr33bUF5zVHj63tET1N8jhez'
  }
})
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
