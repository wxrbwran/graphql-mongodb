import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { history } from 'umi';
import { gql, useLazyQuery } from '@apollo/client';

const SIGNIN = gql`
  query signIn($firstName: String!, $lastName: String!) {
    signIn(createStudentInput: { firstName: $firstName, lastName: $lastName }) {
      id
      token
    }
  }
`;

export default function SignIn() {
  const [signIn, { error, data, loading }] = useLazyQuery(SIGNIN);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    signIn({
      variables: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      localStorage.setItem('token', data.signIn.token);
      history.push({
        pathname: 'students',
      });
    }
  }, [data]);

  return (
    <Form
      className="w-[500px] mx-auto"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="firstName"
        name="firstName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="lastName" name="lastName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
