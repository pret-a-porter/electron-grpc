import { Batch } from 'model/Batch';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from './Result';

export const GrpcPage: FC = () => {
  const [rows, setRows] = useState(0);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const start = performance.now();

    window.client
      .getAll({})
      .on('data', (data: Batch) => {
        console.log('debug: new batch ', data.employees.length);
        setRows((curr) => curr + 1);
      })
      .on('end', () => {
        setResult(performance.now() - start);
      })
      .on('error', (error: unknown) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>Electron gRPC</h1>
      <Result rows={rows} value={result} />
    </main>
  );
};
