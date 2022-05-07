import { useParams } from 'umi';

import { useQuery, gql } from '@apollo/client';

const GET_STUDENT = gql`
  query Student($id: String!) {
    student(id: $id) {
      firstName
      lastName
    }
  }
`;

export default function Student() {
  const params = useParams();
  console.log('params', params);
  console.log('params.id', params.id);

  const { data, error, loading } = useQuery(GET_STUDENT, {
    variables: {
      id: params.id,
    },
  });
  console.log('data', data);
  console.log('error', error);

  if (error) return <div>error page</div>;

  if (loading) return <div>Spinner...</div>;

  const { student } = data;
  return (
    <div className="m-20 p-20">
      <h1>{JSON.stringify(student)}</h1>
    </div>
  );
}
