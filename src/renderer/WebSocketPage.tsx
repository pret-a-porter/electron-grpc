import { Employee } from 'model/Employee';
import { FC, useState } from 'react';
import { List } from './List';

export const WebSocketPage: FC = () => {
  const [list, setList] = useState<Employee[]>([]);

  return (
    <main>
      <h1>Electron WebSocket</h1>
      <List list={list} />
    </main>
  );
};
