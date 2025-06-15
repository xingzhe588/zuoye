import React from 'react';
import Heading from '../../components/heading';
import { useGetListQuery } from '../../store/api';

const ListPage = (): React.ReactElement => {
  const { data, isLoading, error } = useGetListQuery(undefined);

  return (
    <>
      <Heading>List Page New</Heading>
      {isLoading && <div>Loading...</div>}
      {error && <div>Произошла ошибка</div>}
      {data?.map((item) => {
        return (
          <div key={item.id}>
            {item.id}: {item.title} - {item.description}
          </div>
        );
      })}
    </> 
  );
};

export default ListPage;