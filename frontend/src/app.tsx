import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function rootContainer(container: React.ReactElement) {
  return (
    <ConfigProvider locale={zhCN}>
      <ApolloProvider client={client}>{container}</ApolloProvider>
    </ConfigProvider>
  );
}
