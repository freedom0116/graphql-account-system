import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from "react-router-dom";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
  credentials: "include"
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');

  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }));

  return forward(operation);
})

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    localStorage.setItem('accessToken', accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);