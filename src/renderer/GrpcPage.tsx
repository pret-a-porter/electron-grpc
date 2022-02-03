import { Employee } from 'model/Employee';
import { FC, useCallback, useEffect, useState } from 'react';
import { List } from './List';

export const GrpcPage: FC = () => {
  const [list, setList] = useState<Employee[]>([]);

  const fetchAll = useCallback(async () => {
    const response = window.fetchAll();
    response.subscribe((value) => {
      console.log('debug: received new batch. Batch size is ', value.length);
      setList(value);
    });
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <main>
      <h1>Electron gRPC</h1>
      <List list={list} />
    </main>
  );
};
