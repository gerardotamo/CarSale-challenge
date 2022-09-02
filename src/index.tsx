import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './shared/contexts/StoreProvider';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { NetworkError } from '@apollo/client/errors';
export const link = new HttpLink({
  uri: 'https://new-anchovy-87.hasura.app/v1/graphqla',
  headers: {
    'x-hasura-admin-secret': 'rTisquXVdS2Ffxe5nK92OnNQjK72OpuKTPWUpM4kbr33bUF5zVHj63tET1N8jhez'
  },

})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) {
    // handle network error
    if(networkError.message.includes('404')){
      alert('Page not found')
    }else if (networkError.message.includes('500')) {
      alert('Server Error')
    }
    console.log(networkError.message);
  }
});

const appLink = ApolloLink.from([
  errorLink, link
])

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: appLink
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
