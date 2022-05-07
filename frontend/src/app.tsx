import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export function rootContainer(container: React.ReactElement) {
  return (
    <ConfigProvider locale={zhCN}>
      <ApolloProvider client={client}>{container}</ApolloProvider>
    </ConfigProvider>
  );
}
