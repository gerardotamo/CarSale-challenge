import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./shared/contexts/StoreProvider";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const link = new HttpLink({
  uri: "https://working-swan-45.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "6G6GeneaqR7WrQDlRdLzs7NxY0r8I480LFFT3OXGmA4Ijg8xqhIguIZkQLx5oWTl",
  },
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    // handle network error
    if (networkError.message.includes("404")) {
      alert("Page not found");
    } else if (networkError.message.includes("500")) {
      alert("Server Error");
    }
  }
});

const appLink = ApolloLink.from([errorLink, link]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: appLink,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
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

reportWebVitals();
