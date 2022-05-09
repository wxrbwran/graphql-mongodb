import React from 'react';
import { List, Button } from 'antd';
// import Post from '../../components/Post/Post';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'umi';
import AddEditStudent from '@/components/AddEditStudent';

const GET_STUDENTS = gql`
  query {
    students {
      id
      firstName
      lastName
    }
  }
`;

export default function Students() {
  const { error, loading, data } = useQuery(GET_STUDENTS);

  if (error) return <div>Error Page</div>;

  if (loading) return <div>Spinner...</div>;
  console.log('data', data);
  const { students }: any = data;

  return (
    <div className="m-20 p-20">
      <List
        dataSource={students}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.firstName}
              description={
                <div>
                  {item.lastName}
                  <AddEditStudent mode="edit" student={item}>
                    <Button type="primary">编辑</Button>
                  </AddEditStudent>
                </div>
              }
            />
            <Link to={`student/${item.id}`}>{item.id}</Link>
          </List.Item>
        )}
      />
    </div>
  );
}
