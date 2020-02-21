import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, typeDefs } from "./resolvers";
import { setContext } from 'apollo-link-context';



const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MDIwOWZmMS1lYmIwLTRjM2UtODI1OC01NjNhMjA3MzcyOWUiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTgyMDgwODUxLCJleHAiOjE1ODU3MDk2NTF9.3qpGcjubLsMPNblBShEkokuxQaPOk_U7Bz7jZVyZqCQ"
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    typeDefs,
    resolvers
});

cache.writeData({
    data: {
        isShowCreateTodo: false
    }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
