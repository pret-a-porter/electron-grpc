import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Result } from './Result';

export const WebSocketPage: FC = () => {
  const navigate = useNavigate();
  const socket = useRef<Socket>();
  const [rows, setRows] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let start = 0;
    socket.current = io('localhost:5500', {
      autoConnect: false,
      reconnection: false,
      rejectUnauthorized: false,
      secure: false,
      transports: ['websocket'],
    });

    socket.current.on('connect', () => {
      start = performance.now();
    });

    socket.current.connect();

    socket.current.on('data', (data) => {
      setRows((curr) => curr + 1);
    });

    socket.current.on('disconnect', () => {
      setResult(performance.now() - start);
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>Electron WebSocket</h1>
      <Result rows={rows} value={result} />
    </main>
  );
};
