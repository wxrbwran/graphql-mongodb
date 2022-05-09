import React, { FC, useState, useLayoutEffect, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Radio, Input, message } from 'antd';
import DragModal from '../DragModal';

const UPDATE_STUDENT = gql`
  mutation update($id: String!, $firstName: String!, $lastName: String!) {
    updateStudent(
      updateStudentInput: {
        id: $id
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      firstName
      lastName
    }
  }
`;

const FormItem = Form.Item;

interface IProps {
  mode?: string;
  student?: any;
}

const AddEditStudent: FC<IProps> = (props) => {
  const [update, { data, loading }] = useMutation(UPDATE_STUDENT);
  const { children, mode, student = {} } = props;
  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);

  const text = mode === 'edit' ? '编辑' : '添加';
  const initialValues: any = student;

  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = { id: student.id, ...values };
        console.log(params);
        const res = await update({
          variables: params,
        });
        console.log('res', res);
        message.success(`${text}成功`);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log('loading', loading);

  //   if (data && !loading) {

  //   }
  // }, [data]);

  let modalProps: any = {
    okText: '编辑',
    cancelText: '退出',
    onOk: form.submit,
    onCancel: () => setShow(!show),
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        {...modalProps}
        width={520}
        visible={show}
        maskClosable
        centered
        title={text}
        destroyOnClose
      >
        <Form
          colon={false}
          onFinish={handleSubmit}
          form={form}
          initialValues={initialValues}
          preserve={false}
        >
          <div>
            <FormItem label="姓氏" name="firstName">
              <Input placeholder="姓氏" type="text" maxLength={20} />
            </FormItem>
            <FormItem label="名字" name="lastName">
              <Input placeholder="名字" type="text" maxLength={20} />
            </FormItem>
          </div>
        </Form>
      </DragModal>
    </>
  );
};

AddEditStudent.defaultProps = { mode: 'add' };

export default AddEditStudent;
